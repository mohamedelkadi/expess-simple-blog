/**
 * Created by molhm on 6/8/16.
 */
module.exports = function db() {
    return new Promise(function (resolve, reject) {
        var MongoClient = require('mongodb').MongoClient
// Connection URL
        var url = 'mongodb://localhost:27017/node_cms';
// Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                console.log(err);
            }
            else
                resolve(db);
            //db.close();
        });
    });

}


