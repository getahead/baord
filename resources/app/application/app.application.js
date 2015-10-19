'use strict';

var AppApplication;

AppApplication = Marionette.Application.extend({
    regions : {
        headerProjectRegion : '.page__header-project',
        headerUserRegion    : '.page__header-user',
        notifyRegion : '.page__notifier',
        mainRegion   : '.page__main',
        panelRegion  : '.page__panel',
        popupRegion  : '.page__popup'
    },

    initialize : function () {
        this.on('start', function () {
            Backbone.history.start({pushState : true, root : '/'});

            this.appRouter.start();
        }, this);
    }
});

module.exports = AppApplication;