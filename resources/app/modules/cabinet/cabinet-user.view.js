'use strict';

var CabinetUserView,
    template = require('./templates/cabinet-user-view.dot.html');

CabinetUserView = Marionette.ItemView.extend({
    template  : template,
    className : 'cabinet-user',

    ui : {
        iconAction : '.cabinet-user__actions-item',
        form       : '.cabinet-user__form'
    },

    events : {
        'click @ui.iconAction' : '_actionDo',
        'submit @ui.form'      : '_formSubmit'
    },

    modelEvents : {
        'change:user' : 'render'
    },

    initialize : function () {

    },

    _formSubmit : function (e) {
        e.preventDefault();

        var data, merged,
            form = e.currentTarget;

        data = Backbone.Syphon.serialize(form);
        merged = $.extend(true, this.model.toJSON(), data);

        this.model.save(merged, {
            patch   : true,
            wait    : true,
            success : $.proxy(this._handleSuccess, this),
            error   : $.proxy(this.model.handleError, this)
        });

        return false;
    },

    _handleSuccess : function (res) {
        this.model.trigger('change:user');
        App.channel.trigger('notify:event', {
            type : 'success',
            name : 'Data changed',
            messages  : {
                fields : {
                    message : 'Данные успешно изменены'
                }
            }
        });

        this.$el.mod('state', false);
    },

    _actionDo : function (e) {
        var regexp, mod, chosenMod;

        regexp = new RegExp(this.className +  '__actions-item_([a-z]*)');
        mod = e.currentTarget.className.match(regexp);
        chosenMod = mod[1];

        if (chosenMod) {
            if (chosenMod == 'cancel') chosenMod = false;

            this.$el.mod('state', chosenMod);
        }
    }
});

module.exports = CabinetUserView;