/**
 * Created by molhm on 6/8/16.
 */
var Post = require('../libs/model')("posts");

exports.store = function (req, res, next) {
    Post.insertOne(req.body, function (err, data) {
        if (!err)
            res.end(data.toString());
        else
            next(err);
    });
};

exports.index = function (req, res, next) {
    Post.find({}, function (err, data) {
        if (!err) {
            res.status(200).json(data);

        } else {
            next(err);

        }

    });
}
exports.show = function (req, res, next) {
    Post.find({
        "_id": req.params.id

    }, function (err, data) {
        if (!err) {
            res.status(200).json(data[0]);
        } else {
            next(err);
        }
    });
}

exports.update = function (req, res, next) {
    Post.update(
        {'_id': req.params.id},
        req.body
        , function (err, result) {
            if (!err) {
                res.status(200).json(result);
            } else {
                next(err);
            }
        }
    );
}

exports.delete = function (req, res, next) {
    Post.delete({'_id': req.params.id},
        function (err, result) {
            if (!err) {
                res.status(200).json(result);
            } else {
                next(err);
            }
        });
}

