const {MongoClient, ObjectId} = require('mongodb');
var url = require('../config.js').url;
class Database {
    constructor(name){
        MongoClient.connect(url, function(err, db){
            if(err){
                console.error(err);
            }
            this.db = db.collection(name);
            this.ObjectId = ObjectId;
        }.bind(this));
    }
}
module.exports = Database;