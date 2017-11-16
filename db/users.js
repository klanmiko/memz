var Database = require('./service.js');
var shasum = require('shasum');
var Users = new Database('users');
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
   return done(null, false);
};
module.exports.serializeUser = function(user, done) {
    done(null, user._id);
}
module.exports.deserializeUser = function(id, done) {
    Users.db.findOne({_id: id}).then((result) => {done(null, result);}, (err) => {done(err, null);});
}
module.exports.addUser = function(username, password, done) {
    let hash = shasum(password);
    Users.db.insertOne({username: username, password: hash}).then(function(result) {
        return done(null, result);
    }, function(error){
        return done(error, null);
    });
}

