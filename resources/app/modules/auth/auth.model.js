'use strict';

var AuthModel;

AuthModel = Backbone.Model.extend({
    defaults : {
        action : 'login',
        inboxDomain : App.domain,
        actions : {
            login : {
                title : 'Войти',
                buttonTitle : 'Войти',
                required : ['login', 'password']
            },
            registration : {
                title : 'Зарегистрироваться',
                buttonTitle : 'Создать аккаунт',
                required : ['login', 'email', 'password', 'conditions']
            },
            forgot : {
                title : 'Забыли пароль',
                buttonTitle : 'Сбросить пароль',
                required : ['email']
            },
            restore : {
                title : 'Установите новый пароль',
                buttonTitle : 'Установить новый пароль',
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
                errors[attr] = {message : 'Поле <strong>' + attr + '</strong> обязательно'}
            }
        }

        if (attrs.action == 'restore') {
            if (attrs.password !== attrs.repeatpassword) {
                errors['repeatpassword'] = {message : 'Вы неверно повторили пароль'}
            }
        }

        if (attrs.email && !this.validateEmail(attrs.email)) {
            errors['email'] = {message : 'Поле <strong>E-MAIL</strong> заполнено некорректно'}
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