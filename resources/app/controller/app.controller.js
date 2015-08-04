'use strict';

var ProjectsView = require('../views/projects.view'),
    TasksCollection = require('../collection/tasks.collection'),
    TasksView = require('../views/tasks.view'),
    AppController,
    projectsView;

AppController = Marionette.Controller.extend({

    initialize : function (options) {

        this.app = options.app;

        projectsView = new ProjectsView({
            collection : this.app.collection,
            model : new Backbone.Model()
        });

        this.app.headerRegion.show(projectsView);
    },

    index : function () {
        var tasksView = new TasksView({
            collection : new TasksCollection(),
            model : new Backbone.Model()
        });

        projectsView.model.on('change', function (model) {
            tasksView.model.set(model.toJSON());
        });

        this.app.mainRegion.show(tasksView);

    }
});

module.exports = AppController;