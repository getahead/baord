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

        this.projectsCollection.on('sync', this._setProjectModel, this);
    },

    _setProjectModel : function (collection) {
        var model = collection.findWhere({ current : true}) || collection.at(0);

        this.projectModel.set(model.toJSON());
    }
});

module.exports = AppApplication;