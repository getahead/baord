'use strict';

var Auth,
    AuthModel = require('./auth.model'),
    AuthView = require('./auth.view');

Auth = App.module('Auth');

Auth.View = AuthView;
Auth.Model = AuthModel;

Auth.on('start', function () {
    require('./auth.router');
});

module.exports = Auth;