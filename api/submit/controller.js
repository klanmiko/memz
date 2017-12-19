var Database = require('../../db/posts.js');
var userService = require('../../db/users.js');
module.exports.post =  function (req, res) {
    var post = new Object();
    post.title = req.body.title;
    post.file = req.file.filename;
    Database.add(post, function(err, result){
        if(err){
            console.error(err);
            res.status(503).send('Server Error');
            return;
        }
        res.redirect(`/posts/${result._id}`);
    });
};
module.exports.register = function(req, res) {
    userService.addUser(req.body.username, req.body.password, req.body.email, function(error, result){
        if(error) return res.status(500).json({message: "registration failed"});
        req.login(result, function(err){
            res.json({redirect: req.query.back || '/'});            
        });
    });
}