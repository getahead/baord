'use strict';

var NotFound,
    NotFoundView = require('./notfound.view');

NotFound = App.module('NotFound');

NotFound.View = NotFoundView;

NotFound.on('start', function () {});

module.exports = NotFound;