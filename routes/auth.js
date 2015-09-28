var express = require('express'),
    router = express.Router(),
    extend = require('extend'),
    mailTransport = require('../resources/lib/mail/mailTransport'),
    User = require('../resources/lib/model/users.model');

router.get('/info', function (req, res, next) {

    res.send(extend({
        isAuth : (req.user) ? true : false
    }, req.user));
});

router.post('/info', function (req, res, next) {

    if (!req.user || !req.session.sessionID || !req.body) {
        return res.status(500).send({
            name : 'Access denied',
            errors : {
                access : {
                    message : 'Ошибка авторизации. Возможно, Вы вошли с другого устройства'
                }
            }
        });
    }

    var post = req.body;

    if (post.action == 'password') {
        if (post.oldpassword && post.newpassword && post.repeatpassword) {
            if (post.newpassword !== post.repeatpassword) {
                return res.status(500).send({
                    name : 'Passwords do not match to each other',
                    errors : {
                        password : {
                            message : 'Вы неверно повторили новый пароль'
                        }
                    }
                });
            }

            User.findOne({sessionID : req.session.sessionID}, function (err, user) {
                if (err) return next(err);

                user.password = post.newpassword;
                user.save(function (err, user) {
                    if (err) return next(err);

                    req.body.login = user.login;
                    req.body.password = req.body.user.newpassword;

                    authorize(req, res, next);
                });
            });

        } else {
            return res.status(500).send({
                name : 'Password is required',
                errors : {
                    password : {
                        message : 'Заполните все поля'
                    }
                }
            });
        }

    } else if (post.email) {
        User.findOneAndUpdate({sessionID : req.session.sessionID}, {
            $set: {
                email : post.email,
                data : {
                    name    : post.data.name,
                    surname : post.data.surname,
                    city    : post.data.city,
                    country : post.data.country,
                    phone   : post.data.phone
                }
            }
        }, function (err, user) {
            if (err) return res.status(500).send({
                name : 'Duplicate for field email',
                errors : {
                    email : {
                        message : 'Такой E-MAIL уже зарегистрирован в системе'
                    }
                }
            });

            res.json({});
        });
    } else {
        return res.status(500).send({
            name : 'Email is required',
            errors : {
                email : {
                    message : 'Поле E-MAIL обязательно'
                }
            }
        });
    }
});


router.post('/registration', registration);
router.post('/login', authorize);
router.post('/logout', logout);

router.post('/forgot', function (req, res, next) {
    var email = req.body.email;

    if (!email) {
        return res.status(500).send({
            name : 'Fill the field E-MAil',
            errors : {
                email : {
                    message : 'Поле E-MAIL должно быть заполнено'
                }
            }
        });
    }

    User.forgotPassword(email, req, function (err, restoreID) {
        if (err) return res.status(500).send(err);

        var messageHTML, restoreLink;

        restoreLink = 'http://www.chb.su/login/restore/' + restoreID;

        messageHTML = '<p>Чтобы восстановить пароль, пройдите по ссылке ' +
            '<a href="' + restoreLink + '">' + restoreLink + '</a></p>' +
            '<p>Внимание! Данная ссылка действительна только в том браузере, в котором Вы сбрасывали пароль.</p>'

        mailTransport.sendMail({
            to          : [ { address : email } ],
            headers : {
                'X-Sender'   : 'no-reply@chb.su',
                'Originator' : 'no-reply@chb.su',
                'X-Mailer'   : 'chb.su',
                'Language'   : 'en'
            },
            from        : 'no-reply@chb.su',
            sender      : 'no-reply@chb.su',
            subject     : 'Восстановление пароля',
            html        : messageHTML
        });

        res.send({ok : true});
    });
});

router.post('/restore', function (req, res, next) {
    var restoreID      = req.body.restoreID,
        password       = req.body.password,
        repeatpassword = req.body.repeatpassword,
        errors = {};

    if (!restoreID) errors.restoreID = {message : 'Ссылка для восстановления пароля неправильная'};
    if (!password || password !== repeatpassword) errors.password = {message : 'Повторите пароль правильно'};

    if (Object.keys(errors).length > 0) {
        return res.status(500).send({
            name : 'Errors while resetting the password',
            errors : errors
        });
    }

    User.restorePassword(restoreID, password, req, function (err, sessionID) {
        if (err) return res.status(500).send(err);

        req.session.sessionID = sessionID;
        res.send({sessionID : sessionID});
    });
});

function authorize (req, res, next) {
    var login    = req.body.login,
        password = req.body.password,
        remember = req.body.remember;

    User.authorize(login, password, req, function (err, sessionID) {
        if (err) return res.status(500).send(err);

        req.session.sessionID = sessionID;

        if (remember) setCookie(res, 'sessionID', sessionID);
        else removeCookie(res, 'sessionID');

        res.send({sessionID : sessionID});
    });
}

function registration (req, res, next) {
    var newUser,
        login, password, email,
        inboxCollection;

    login    = req.body.login.toLowerCase();
    password = req.body.password;
    email    = req.body.email;
    inboxCollection = req.body.inboxCollection;

    newUser = new User({
        login     : login,
        password  : password,
        email     : email,
        inboxCollection : inboxCollection
    });

    newUser.save(function(err, user) {
        if (err) return res.status(500).send(err);

        authorize(req, res, next);
    });
}

function setCookie (res, name, val, expire) {
    var expireDate = expire || new Date() + 3600 * 24 * 365;

    return res.cookie(name, val, {path : '/', expire : expireDate});
}
function removeCookie (res, name) {
    return res.clearCookie(name, {path : '/'});
}

function logout (req, res, next) {
    req.session.sessionID = null;
    removeCookie(res, 'sessionID');

    res.end();
}

module.exports = router;
