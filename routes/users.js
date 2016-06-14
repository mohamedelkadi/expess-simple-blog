var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    console.log("login body", req.body);
    User.find(req.body, function (err, result) {
        if (!err) {
            if (result.length > 0) {
                req.session.logged = true;
                res.cookie('login', 1, {maxAge: 900000});
                res.status(200).send();
            }
        } else {
            next(err);
        }
    });
});
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            throw  Error(err);
        }
        else {
            res.clearCookie('login', {});
            res.status(200).send();
        }
    });

});

module.exports = router;
