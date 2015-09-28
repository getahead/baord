'use strict';

var PanelUser,
    PanelUserView = require('./panel-user.view');


PanelUser = App.module('PanelUser');

PanelUser.View = PanelUserView;

PanelUser.on('start', function () {});

module.exports = PanelUser;