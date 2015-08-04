'use strict';
/*  That's for Marionette Inspector */
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

var App = require('./application/app.application'),
    AppRouter = require('./routes/app.router'),
    AppController = require('./controller/app.controller'),
    ProjectsCollection = require('./collection/projects.collection'),
    app;


app = new App({
    el         : $('body'),
    collection : new ProjectsCollection(),
    projectID  : ''
});


app.appRouter = new AppRouter({
    controller : new AppController({
        app : app
    })
});

app.start();

module.exports = app;