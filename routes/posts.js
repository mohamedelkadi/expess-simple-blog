/**
 * Created by molhm on 6/8/16.
 */
var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts');

/* GET home page. */
router.get('/', function (req, res, next) {
    postsController.index(req, res, next);
});

router.post('/new', function (req, res, next) {

    postsController.store(req, res, next);
});

router.put('/:id', function (req, res, next) {
    postsController.update(req, res, next);
});

router.get('/:id', function (req, res, next) {
    postsController.show(req, res, next);
});

router.delete('/:id', function (req, res, next) {
    postsController.delete(req, res, next);
});

module.exports = router;
