var Database = require('../../db/posts.js');
var userService = require('../../db/users.js');
var sanitize = require('sanitize-filename');
var fs = require('fs');
var path = require('path');
module.exports.post =  function (req, res) {
    var post = new Object();
    post.title = req.body.title;
    post.file = req.file.filename;
    Database.add(post, req.user, function(err, result){
        if(err){
            console.error(err);
            res.status(503).send('Server Error');
            return;
        }
        res.json({redirect: `/posts/${result._id}`});
    });
};
module.exports.file = function(req, res) {
    if(!req.params.id) res.status(500).send("invalid query");
    let filename = sanitize(req.params.id);
    fs.stat(path.resolve(__dirname, "./uploads/", filename), function(err, stats){
        if(err) {
            console.error(err)
            return res.status(500).send(err);
        }
        if(stats.isFile()) res.sendFile(path.resolve(__dirname, "./uploads/", filename));
        else res.status(404).send("invalid filename");
    });
}
module.exports.register = function(req, res) {
    userService.addUser(req.body.username, req.body.password, req.body.email, function(error, result){
        if(error) return res.status(500).json({message: "registration failed"});
        req.login(result, function(err){
            res.json({redirect: req.query.back || '/'});   
            //res.redirect(req.query.back || "/")         
        });
    });
}