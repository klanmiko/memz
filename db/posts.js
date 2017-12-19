var Database = require('./service.js');
var Posts = new Database('posts');
function sanitize(string) {
    //TODO figure out what needs to be done here
    return string;
}
module.exports.get = function(id, done) {
    Posts.db.aggregate([
        
    ], function(result){

    });
}
module.exports.add = function(post, cb) {
    if(!post.title || !post.file) {
        cb(new Error("missing arguments"));
        return;    
    }
    post.title = sanitize(post.title);
    post.Timestamp = new Date().getDate();
    post.votes = {count: 0, users: []};
    post.comments = {count: 0, data: []};
    Posts.db.insertOne(post, cb);
}
module.exports.upvote = function(post, user, cb) {
    Posts.db.findOne({_id: Posts.ObjectId(post)}).then(function(result){
        if(!result) return cb(new Error("post not found"));
        Posts.db.findOne({_id: Posts.ObjectId(post), "votes.users.userId": user._id}).then(function(result){
            if(result) {
                Posts.db.updateOne({_id: Posts.ObjectId(post)}, 
                    {$dec: {"votes.count": 0}, $pull: {"votes.users.userId": user._id}}).then(function(result){
                        cb(null);
                    });
            }
            else{
                Posts.db.updateOne({_id: Posts.ObjectId(post)},
                    {$inc:{"votes.count": 1}, $addToSet: {"votes.users":{userId: user._id}}}).then(function(result) {
                        cb(null);
                    });
            }
        });
    }, function(error){
        return cb(error);
    });
}
module.exports.addComment = function(comment, user, done) {
    Posts.db.findOne({_id: Posts.ObjectId(comment.postId)}).then(function(result){
        if(!result) return done(new Error("post not found"));
        Posts.db.updateOne({_id: result._id}, {$inc: {"comments.count": 1}, 
        $addToSet:{"comments.data": {author: user._id, topLevel: true, text: comment.text, votes: {count: 0, users: []}}}}).then(function(result){
            if(!result) return new Error("database update error");
            return done(result);
        });
    },
    function(error){
        done(error);
    });
}
module.exports.upvoteComment = function(comment, user, done) {
    Posts.db.findOne({_id: Posts.ObjectId(comment.postId), "comments.data._id": Posts.ObjectId(comment._id)}).then(function(result){
        if(!result) return done(new Error("comment"));
        Posts.db.updateOne({_id: result._id}, {$inc: {"comments.data.count": 1}, 
        $addToSet:{"comments.data": {author: user._id, topLevel: true, text: comment.text, votes: {count: 0, users: []}}}}).then(function(result){
            if(!result) return new Error("database update error");
            return done(result);
        });
    },
    function(error){
        done(error);
    });
}
module.exports.replyToComment = function(comment, replyTo, user, done) {

}