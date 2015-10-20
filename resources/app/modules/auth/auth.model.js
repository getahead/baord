'use strict';

var AuthModel;

AuthModel = Backbone.Model.extend({
    defaults : {
        action : 'login',
        inboxDomain : App.domain,
        actions : {
            login : {
                title : i18n.t('auth.signin'),
                buttonTitle : i18n.t('auth.input.button_signin'),
                required : ['login', 'password']
            },
            registration : {
                title : i18n.t('auth.signup'),
                buttonTitle : i18n.t('auth.input.button_signup'),
                required : ['login', 'email', 'password', 'conditions']
            },
            forgot : {
                title : i18n.t('auth.forgot'),
                buttonTitle : i18n.t('auth.input.button_forgot'),
                required : ['email']
            },
            restore : {
                title : i18n.t('auth.setnewpassword'),
                buttonTitle : i18n.t('auth.input.button_setnewpassword'),
                required    : ['password', 'repeatpassword']
            }
        }
    },

    url : function () {
        return '/auth/' + this.get('action');
    },

    validate : function (attrs, options) {
        var errors = {},
            required = this.get('actions')[attrs.action].required;

        for (var i = 0; i < required.length; i++) {
            var attr = required[i];
            if (!attrs[attr]) {
                errors[attr] = {message : i18n.t('auth.message.required_field', {field : attr,  escapeInterpolation: false})}
            }
        }

        if (attrs.action == 'restore') {
            if (attrs.password !== attrs.repeatpassword) {
                errors['repeatpassword'] = {message : i18n.t('auth.message.wrong_password_repeat')}
            }
        }

        if (attrs.email && !this.validateEmail(attrs.email)) {
            errors['email'] = {message : i18n.t('auth.message.wrong_field', {field : 'E-MAIL',  escapeInterpolation: false})}
        }

        if (!_.isEmpty(errors)) {
            this.handleError(errors);
            return errors;
        }
    },

    validateEmail : function (email) {
        return /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/.test(email);
    },

    handleError : function (err) {
        App.channel.trigger('notify:event', {
            type : 'error',
            name : 'Validation Error',
            messages  : err
        });
    }
});

module.exports = AuthModel;