'use strict';

var UserModel;


UserModel = Backbone.Model.extend({
    defaults : {
        isAuth    : false
    },

    idAttribute : '_id',
    url         : '/auth/info',

    logout : function () {
        $.ajax({
            method : 'post',
            url  : '/auth/logout',
            success : function (res) {
                App.appRouter.navigate('/', {trigger : true});
                $.removeCookie("sessionID", {path: '/'});
                this.clear();
            }.bind(this)
        })
    },

    handleError : function (model, xhr) {
        if (!xhr || xhr.status == 404) {
            App.channel.trigger('notify:event', {
                type : 'error',
                messages  : {
                    notFound : {
                        message : 'Ошибка сервера. Попробуйте позже'
                    }
                }
            });

            return;
        }

        App.channel.trigger('notify:event', {
            type : 'error',
            name : xhr.responseJSON.name,
            messages  : xhr.responseJSON.errors
        });
    }

});

module.exports = UserModel;