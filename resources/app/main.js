'use strict';

// require libs

    require('jquery.bem');
    require('jquery.cookie');
    require('backbone.syphon');
    require('backbone.radio');

    require('plugins/redactorjs/redactor');


var App,
    AppApplication     = require('application/app.application'),
    AppRouter          = require('routes/app.router'),
    TasksCollection    = require('collection/tasks.collection'),
    ProjectsCollection = require('collection/projects.collection'),
    ProjectModel       = require('model/project.model'),
    UserModel          = require('model/user.model'),
    translations       = require('json!../locales/translation.json');


i18n.init({
    resStore : translations
});

App = new AppApplication({
    el      : $('body'),
    channel : Backbone.Radio.channel('app'),

    appRouter : new AppRouter(),
    Behaviors : {}
});

Marionette.Behaviors.behaviorsLookup = function() {
    return App.Behaviors;
};


window.App = App;

App.projectModel       = new ProjectModel();
App.projectsCollection = new ProjectsCollection();
App.tasksCollection    = new TasksCollection();

App.userModel = new UserModel();
App.userModel.fetch();

App.userModel.on('sync', function () {
    App.projectsCollection.fetch();
});
App.projectsCollection.once('sync', App.start, App);


// Behaviors
App.Behaviors.ModalBehavior = require('behaviors/modal/modal.behavior');
//App.Behaviors.FormBehavior  = require('behaviors/form/form.behavior');

// Require Modules

require('modules/projects/projects');
require('modules/tasks/tasks');
require('modules/newtask/newtask');
require('modules/newproject/newproject');
require('modules/task/task');
require('modules/auth/auth');
require('modules/panel-user/panel-user');
require('modules/cabinet/cabinet');
require('modules/notifier/notifier');
require('modules/notfound/notfound');
