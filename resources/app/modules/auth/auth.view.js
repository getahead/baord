'use strict';

var AuthView,
    template = require('./templates/auth-view.dot.html');

AuthView = Marionette.ItemView.extend({
    template  : template,
    className : 'auth',

    ui : {
        'button': '.auth__button',
        'form'  : '.auth__form',
        'link'  : '.auth__link'
    },

    events : {
        'submit @ui.form'  : '_formSubmit',
        'click @ui.link' : '_navigate'
    },

    _formSubmit : function (e) {
        e.preventDefault();

        var data = Backbone.Syphon.serialize(this.ui.form),
            domain = this.model.get('inboxDomain');

        data.inboxCollection = [{
            name : data.login,
            domain : domain,
            inbox : data.login + '@' + domain
        }];

        this.model.set(data);

        this.model.save(null, {
            wait    : true,
            success : $.proxy(this._handleSuccess, this),
            error   : $.proxy(this._handleError, this)
        });

        return false;
    },

    _handleSuccess : function (model) {
        if (model.get('action') == 'forgot') {
            App.channel.trigger('notify:event', {
                type : 'notice',
                waitForClose : true,
                name : 'E-MAIL sent',
                messages  : {
                    success : {message : 'На E-MAIL ' + model.get('email') + ' отправлено письмо'},
                    todo    : {message : 'Следуйте инструкциям из письма, чтобы восстановить пароль'}
                }
            });

            return;
        }

        App.userModel.fetch({
            success : function (res) {
                App.appRouter.navigate('/cabinet', {trigger : true});
            }.bind(this)
        });
    },

    _handleError : function (model, xhr) {
        App.channel.trigger('notify:event', {
            type : 'error',
            name : xhr.responseJSON.name,
            messages  : xhr.responseJSON.errors
        });
    },

    _navigate : function (e) {
        e.preventDefault();

        var $elem,
            href;

        $elem  = $(e.currentTarget);
        href   = $elem.attr('href');

        App.appRouter.navigate(href, {trigger : true});
    }
});

module.exports = AuthView;