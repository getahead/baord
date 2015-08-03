require('marionette');

'use strict';

var App,
    app;

App = Marionette.Application.extend({
    regions : {
        someRegion: "#header",
        anotherRegion: "#main"
    },

    initialize : function () {

    }
});

app = new App();

app.on('start', function () {
    Backbone.history.start();
});


$(function () {
    app.start();
}());