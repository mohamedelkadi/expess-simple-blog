var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.jade', {
        locals: {title: 'my blog'},
        'authorised': !!req.session.logged
    });
});

module.exports = router;
