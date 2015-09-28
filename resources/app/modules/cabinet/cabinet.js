'use strict';

var Cabinet,
    CabinetView = require('./cabinet.view');

Cabinet = App.module('Cabinet');

Cabinet.View = CabinetView;

Cabinet.on('start', function () {
    require('./cabinet.router');
});

module.exports = Cabinet;