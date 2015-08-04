'use strict';

var App;

App = Marionette.Application.extend({
    regions : {
        headerRegion : '#header',
        mainRegion   : '#main'
    },

    initialize : function () {

        this.on('start', function () {
            if (Backbone.history) {
                Backbone.history.start();
            }
        });

    }

});

module.exports = App;