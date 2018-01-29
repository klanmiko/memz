var Database = require('./service.js');
var Posts = new Database('posts');
var Users = require('./users.js');
function sanitize(string) {
    //TODO figure out what needs to be done here
    return string;
}
module.exports.get = function(id, done) {
    Posts.db.aggregate([
        {$match: {
            _id: Posts.ObjectId(id)
        }},
        {$unwind: {
            path:"$comments",
            preserveNullAndEmptyArrays: true
        }},
        {$graphLookup: {
            from: "posts",
            startWith: {$eq: ["topLevel", true]},
            connectFromField: "children._id",
            connectToField: "_id",
            as: "comments"
        }},
        {$project: {
            file: 1,
            title: 1,
            comments: 1,
            voteCount: 1,
            commentCount: 1
        }}
    ], function(err, result){
        done(err, result[0]);
    });
};
module.exports.getCursored = function(prevId, user, done) {
    let query = Object();
    if(prevId) query._id = {$gt: prevId};
    let projection = {_id: 1, "voteCount": 1, "commentCount": 1, title: 1, file: 1};
    if(user) projection.votes = {$elemMatch:{userId: user._id}};
    Posts.db.find(query).project(projection).limit(10).toArray(function(err, results) {
        if(err) return done(err);
        results.forEach(element => {
            if(element.votes) element.voted = true;
        });
        done(null, results);
    });
}
module.exports.add = function(post, user, cb) {
    if(!post.title || !post.file) {
        cb(new Error("missing arguments"));
        return;    
    }
    post.title = sanitize(post.title);
    post.Timestamp = new Date().toString();
    post.votes = [];
    post.comments = [];
    post.voteCount = 0;
    post.commentCount = 0;
    post.author = user._id;
    Posts.db.insertOne(post, function(err, result){
        if(err) return cb(err);
        var doc = result.ops[0]
        doc._id = result.insertedId;
        Users.addPost(user, doc, function(err){
            cb(err, doc);
        });
    });
}
module.exports.upvote = function(post, user, cb) {
    Posts.db.findOne({_id: Posts.ObjectId(post)}, {_id: 1}).then(function(result){
        if(!result) return cb(new Error("post not found"));
        Posts.db.findOne({_id: Posts.ObjectId(post), "votes.userId": user._id}, {_id: 1}).then(function(result) {
            if(result) {
                Posts.db.updateOne({_id: Posts.ObjectId(post)}, 
                    {$inc: {"voteCount": -1}, $pull: {votes:{userId: user._id}}}).then(function(result){
                        return Users.removeVote(user, {_id: post}, cb);
                    });
            }
            else{
                Posts.db.updateOne({_id: Posts.ObjectId(post)},
                    {$inc:{"voteCount": 1}, $addToSet: {"votes":{userId: user._id}}}).then(function(result) {
                        return Users.addVote(user, {_id: post}, cb);
                    });
            }
        });
    }, function(error){
        return cb(error);
    });
}
module.exports.addComment = function(comment, user, done) {
    let id = Posts.ObjectId();
    Posts.db.updateOne({_id: Posts.ObjectId(comment.postId)}, {$inc: {"commentCount": 1}, 
    $addToSet:{"comments": {_id: id, author: user._id, topLevel: true, text: comment.text, voteCount: 0, children: [], votes:[]}}}).then(function(res){
        Users.addComment(user, {_id: id} , done);
    }, function(error){
        console.error(error);
        done(error);
    });
}
module.exports.upvoteComment = function(comment, user, done) {
    Posts.db.updateOne({_id: Posts.ObjectId(comment.postId)}, {$inc: {"commentCount": 1}}).then(function(result){
        if(!result) return new Error("database update error");
        Users.addVote(user, comment, done);
    });
}
module.exports.replyToComment = function(comment, replyTo, user, done) {
    let id = Posts.ObjectId();
    Posts.db.findOne({"comments._id": Posts.ObjectId(replyTo)}).then(function(result){
        if(!result) return done(new Error("post not found"));
        Posts.db.updateOne({_id: result._id}, {$inc: {"commentCount": 1}, 
        $addToSet:{"comments": {_id: id, author: user._id, topLevel: false, parent: replyTo, text: comment.text, children: [], votes: {count: 0, users: []}}}}).then(function(res){
            if(!res) return new Error("database update error");
            Posts.db.findOne({_id: result._id}, {"comments": {$elemMatch:{author: user._id, topLevel: false, parent: replyTo._id, text: comment.text}}}, {"comments.$": 1}).then(function(res){
                Users.addComment(user, res.comments.data[0], done);
            });
        });
    },
    function(error){
        done(error);
    });
}