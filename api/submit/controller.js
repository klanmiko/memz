var Database = require('../../db/posts.js');
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