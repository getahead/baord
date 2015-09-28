'use strict';

var Notifier,
    NotifierView = require('./notifier.view');


Notifier = App.module('Notifier');

Notifier.View = NotifierView;

Notifier.on('start', function () {

    App.channel.on('notify:event', function (params) {

        App.notifyRegion.show(new NotifierView({
            model : new Backbone.Model(params)
        }));
    }, this)
});

module.exports = Notifier;