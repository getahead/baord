var UserSchema,
    User,
    crypto = require('crypto'),
    db = require('../db'),
    uniqueValidator = require('mongoose-unique-validator');


UserSchema = new db.Schema({
    _id       : db.Schema.Types.ObjectId,
    login     : {
        type     : String,
        required : true,
        unique   : true,
        index    : true,
        lowercase: true,
        trim     : true
    },
    hashedPassword  : {
        type     : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    },
    email     : {
        type     : String,
        unique   : true,
        required : true,
        lowercase: true,
        trim     : true
    },
    data      : {
        surname : String,
        name    : String,
        phone   : String,
        country : String,
        city    : String
    },
    created  : {
        type : Date,
        default : Date.now
    },
    sessionID : {
        type : String,
        index: true
    },
    restoreID : {
        type : String,
        index: true
    },
    restoreDate : {
        type : Date
    }
});

UserSchema.plugin(uniqueValidator, { message: 'Такой {PATH} уже существует' });

UserSchema.path('email').validate(function (email) {
    var regex =  /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
    return regex.test(email);
}, 'Invalid E-MAIL');

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

UserSchema.virtual('password').set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password)
}).get(function () {
    return this._plainPassword;
});

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}


UserSchema.statics.authorize = function (username, password, req, callback) {
    var User = this;
    username = username.toLowerCase();

    User.findOne({ login : username }, function (err, user) {
        if (err) return next(err);

        if (user && user.checkPassword(password)) {
            var sessionID = createSessionID(req.headers['user-agent'], req.ip, username, user.salt);

            User.findOneAndUpdate({ login : username }, {$set: {sessionID : sessionID}}, function (err, user) {
                if (err) return next(err);

                callback(null, sessionID);
            });

        } else {
            callback({name : 'Access denied', errors : {
                access : {
                    message : 'Ошибка входа. Логин и пароль не подходят'
                }
            }});
        }
    });
}

UserSchema.statics.authorizeBySessionID = function (sessionID, req, callback) {
    User = this;

    User.findOne({ sessionID : sessionID}, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return callback({error : 'no user found'});
        }

        var thisSessionID = createSessionID(req.headers['user-agent'], req.ip, user.login, user.salt);

        if (sessionID == thisSessionID) {
            callback(null, {
                _id   : user._id,
                login : user.login,
                data  : user.data,
                email : user.email,

                inboxCollection : user.inboxCollection,
                allowedDomains  : user.allowedDomains,
                maxInboxCount   : user.maxInboxCount
            });
        } else {
            callback({error : 'session is not correct'});
        }
    });
}

UserSchema.statics.forgotPassword = function (email, req, callback) {
    var User = this;

    User.findOne({email : email}, function (err, user) {
        if (err || !user) return callback({
            name : 'No user found',
            errors : {
                email : {
                    message : 'Пользователь не найден'
                }
            }
        });

        var thisRestoreID = createSessionID(req.headers['user-agent'], req.ip, user.login, user.salt);
        user.restoreID = thisRestoreID;
        user.restoreDate = Date.now();

        user.save(function (err, user) {
            if (err) return callback(err);

            callback(null, thisRestoreID);
        })
    })
}

UserSchema.statics.restorePassword = function (restoreID, password, req, callback) {
    var User = this,
        restoreError = {
            name : 'No user found',
            errors : {
                email : {
                    message : 'Ссылка для восстановления пароля недействительна'
                }
            }
        };


    User.findOne({restoreID : restoreID}, function (err, user) {
        if (err || !user) return callback(restoreError);

        var thisRestoreID = createSessionID(req.headers['user-agent'], req.ip, user.login, user.salt);

        if (restoreID !== thisRestoreID) return callback(restoreError);

        user.restoreID = '';
        user.sessionID = thisRestoreID;
        user.password = password;

        user.save(function (err, user) {
            if (err) return callback(err);

            callback(null, thisRestoreID);
        })
    })
}

function createSessionID(UserAgent, ip, username, salt) {
    return crypto.createHmac('sha1', salt + UserAgent + ip).update(username).digest('hex');
}

User = db.model('users', UserSchema);


module.exports = User;