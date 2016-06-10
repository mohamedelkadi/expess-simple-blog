/**
 * Created by molhm on 6/8/16.
 */
var db = require('./database');
module.exports = function (collection) {
    var model = {};
    model.collection = collection;
    model.insertOne = function (doc, callback) {
        // Get the documents collection
        db().then(
            function (db) {
                var collection = db.collection(model.collection);
                // Insert some documents
                collection.insertOne(doc, function (err, result) {
                    callback(null, result);
                });
            }
        ).catch(
            function (err) {
                callback(err);
            }
        );


    }
    model.find = function (doc, callback) {
        db().then(
            function (db) {
                if (doc['_id'])
                    doc['_id'] = new require('mongodb').ObjectID(doc["_id"]);
                // if error happened here no thing happen ..why?
                var collection = db.collection(model.collection);
                collection.find(doc).toArray(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);

                    }
                });
            }
        ).catch(
            function (err) {
                callback(err);
            }
        );
    }

    model.update = function (select, doc, callback) {
        db().then(function (db) {
            if (select['_id'])
                select['_id'] = new require('mongodb').ObjectID(select["_id"]);

            var collection = db.collection(model.collection);
            // Update document where a is 2, set b equal to 1
            collection.updateOne(select
                , {"$set": doc},
                function (err, result) {
                    if (!err) {
                        callback(null, result);
                    } else {
                        callback(err)
                    }
                });
        }).catch(function (err) {
            callback(err);
        })

    }

    model.delete = function (doc, callback) {
        db().then(function (db) {
                if (doc['_id'])
                    doc['_id'] = new require('mongodb').ObjectID(doc["_id"]);
                var collection = db.collection(model.collection);

                collection.deleteOne(doc, function (err, result) {
                    callback(null, err);
                })
            })
            .catch(function (err) {
                callback(err);
            });
    }
    return model;
}
