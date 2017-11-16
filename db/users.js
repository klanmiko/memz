var Database = require('./service.js');
var shasum = require('shasum');
var Users = new Database('users');
module.exports.authenticate = function (username, password, done) {
    Users.db.findOne({username: username}).then(function(result){
        if(password == shasum(password))
            return done(null, result);
        else
            return done(null, false);
    }, function(err){
        console.error(err);
        return done(err);
    })
   return done(null, false);
  };

