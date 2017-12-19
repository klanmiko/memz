var Database = require('./service.js');
var shasum = require('shasum');
var Users = new Database('users');
let itemType = new Map();
itemType.set("post", 0);
itemType.set("comment", 1);
module.exports.authenticate = function (username, password, done) {
    Users.db.findOne({username: username}).then(function(result){
        if(result.password == shasum(password))
            return done(null, result);
        else
            return done(null, false);
    }, function(err){
        console.error(err);
        return done(err);
    })
};
module.exports.serializeUser = function(user, done) {
    done(null, user._id.valueOf());
}
module.exports.deserializeUser = function(id, done) {
    Users.db.findOne({_id: Users.ObjectId(id)}).then(
        (result) => {done(null, {username: result.username});}, 
        (err) => {done(err, null);}
    );
}
module.exports.addUser = function(username, password, email, done) {
    let hash = shasum(password);
    Users.db.insertOne({username: username, password: hash, email: email}).then(function(result) {
        return done(null, result);
    }, function(error){
        return done(error, null);
    });
}
module.exports.addVote = function(user, item, done) {
    let type = itemType.get("post");
    if(item.text) type = itemType.get("comment");
    Users.db.updateOne({_id: user._id}, {$addToSet:{votes: {itemId: item._id, type: type}}}).then(function(result) {
        if(!result) return done(new Error("user not found"));
        return done(null, result);
    }, function(error){
        done(error);
    });
}

