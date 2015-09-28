'use strict';

var CabinetView,
    template         = require('./templates/cabinet-view.dot.html'),
    CabinetUserView  = require('./cabinet-user.view'),
    CabinetInboxView = require('./cabinet-inbox.view'),
    CabinetInboxCollection = require('./cabinet-inbox.collection');

CabinetView = Marionette.LayoutView.extend({
    template : template,
    className: 'cabinet',

    regions : {
        user  : '.cabinet__user',
        inbox : '.cabinet__inbox'
    },

    _fillRegions : function () {
        var cabinetInboxCollection,
            cabinetUserView, cabinetInboxView;

        cabinetUserView  = new CabinetUserView({model : this.model});

        cabinetInboxCollection = new CabinetInboxCollection(this.model.get('inboxCollection'));
        cabinetInboxView = new CabinetInboxView({
            model      : this.model,
            collection : cabinetInboxCollection
        });

        this.user.show(cabinetUserView);
        this.inbox.show(cabinetInboxView);
    },

    onRender : function () {
        this._fillRegions();
    }
});

module.exports = CabinetView;