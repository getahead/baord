'use strict';

// require libs

require('jquery.bem');
require('jquery.cookie');
require('backbone.syphon');

/*  That's for Marionette Inspector */
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

var App,
    AppApplication     = require('application/app.application'),
    AppRouter          = require('routes/app.router'),
    TasksCollection    = require('collection/tasks.collection'),
    ProjectsCollection = require('collection/projects.collection'),
    ProjectModel       = require('model/project.model');


App = new AppApplication({
    el                 : $('body'),
    appRouter          : new AppRouter(),
    projectsCollection : new ProjectsCollection(),
    projectModel       : new ProjectModel()
});

window.App = App;

App.tasksCollection = new TasksCollection();
App.projectsCollection.once('sync', App.start, App);


// Require Modules

require('modules/projects/projects');
require('modules/tasks/tasks');
require('modules/newtask/newtask');
require('modules/task/task');
