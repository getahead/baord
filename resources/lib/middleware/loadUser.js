var User = require('../model/users.model');

module.exports = function (req, res, next) {
    var sessionID;

    req.session.sessionID = req.session.sessionID || req.cookies.sessionID;
    sessionID = req.session.sessionID || req.cookies.sessionID;

    if (!sessionID) return next();


    User.authorizeBySessionID(sessionID, req, function (err, user) {
        if (err) console.log(err);

        req.user = user;
        next();
    })
}