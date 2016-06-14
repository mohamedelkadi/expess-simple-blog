/**
 * Created by molhm on 6/13/16.
 */
exports.authed = function (req, res, next) {
    console.log("authed called ");
    console.log('state ',   req.session.logged)
    if (!req.session.logged)
        next(Error("Not authed"));
    else {
        next();
    }
}

