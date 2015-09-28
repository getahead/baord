'use strict';

var CabinetInboxView,
    CabinetInboxItemView = require('./cabinet-inbox-item.view'),
    template = require('./templates/cabinet-inbox-view.dot.html');

CabinetInboxView = Marionette.CompositeView.extend({
    template  : template,
    className : 'cabinet-inbox',

    childView          : CabinetInboxItemView,
    childViewContainer : '.cabinet-inbox__items',

    ui : {
        formAdd : '.cabinet-inbox__form'
    },

    modelEvents : {
        'change' : 'render'
    },

    childEvents: {
        'inbox:delete': function (view) {
            view.model.destroy({
                wait : true,
                success : $.proxy(this._handleSuccessDelete, this),
                error   : $.proxy(this.model.handleError, this)
            });
        }
    },

    events : {
        'submit @ui.formAdd' : 'addInbox'
    },

    addInbox : function (e) {
        e.preventDefault();

        var data,
            form = e.currentTarget;

        data = Backbone.Syphon.serialize(form);

        if (!data.name || !data.domain) return;

        this.collection.create(data, {
            wait    : true,
            success : $.proxy(this._handleSuccess, this),
            error   : $.proxy(this.model.handleError, this)
        });

        return false;
    },

    _handleSuccessDelete : function (res) {
        App.channel.trigger('notify:event', {
            type : 'success',
            name : 'Data changed',
            messages  : {
                fields : {
                    message : 'Почтовый ящик удален'
                }
            }
        });

        this.ui.formAdd.trigger('reset');
    },

    _handleSuccess : function (res) {
        App.channel.trigger('notify:event', {
            type : 'success',
            name : 'Data changed',
            messages  : {
                fields : {
                    message : 'Почтовый ящик создан. Письма будут приходить на ' + this.model.get('user').email
                }
            }
        });

        this.ui.formAdd.trigger('reset');
    }

});

module.exports = CabinetInboxView;