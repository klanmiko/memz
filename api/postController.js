var Posts = require('../db/posts.js');
module.exports.get = function(req, res){
    Posts.getCursored(req.query.id, req.user, function(err, array){
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({posts: array});
    });
};
module.exports.getPost = function(req, res) {
    Posts.get(req.params.id, function(err, result){
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        res.json(result);
    });
};
module.exports.vote = function(req, res) {
    Posts.upvote(req.params.id, req.user, function(err){
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.sendStatus(200);
    });
}
module.exports.comment = {
    create: function(req, res) {
        if(!req.body || !req.body.comment || !req.body.comment.text) return res.status(500).send("invalid arguments");

        req.body.comment.postId = req.params.id;
        Posts.addComment(req.body.comment, req.user, function(err, result){
            if(err) return res.status(500).send(err);
            return res.sendStatus(200);
        })
    },
    vote: function(req, res) {
        Posts.upvoteComment(req.params.commentId, user, function(err){
            if(err) return res.status(500).send(err);
            return res.sendStatus(200);
        });
    },
    reply: function(req, res) {
        if(req.query.body.comment && req.query.body.comment.text)
        Posts.replyToComment(req.query.body.comment, req.params.commentId, req.user, function(err){
            if(err) return res.status(500).send(err);
            return res.sendStatus(200);
        });
    }
}
