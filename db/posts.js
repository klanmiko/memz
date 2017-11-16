var Database = require('./service.js');
var Posts = new Database('posts');
function sanitize(string) {
    //TODO figure out what needs to be done here
    return string;
}
module.exports.add = function(post, cb) {
    if(!post.title || !post.file) {
        cb("missing arguments");
        return;    
    }
    post.title = sanitize(post.title);
    post.Timestamp = new Date().getDate();
    Posts.insertOne(post, cb);
}