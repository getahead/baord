'use strict';

var ProjectModel = require('../model/project.model'),
    ProjectsCollection;

ProjectsCollection = Backbone.Collection.extend({
    model : ProjectModel,
    url : '/action/projects',

    initialize : function () {
        this.fetch({reset : true});
    }
});

module.exports = ProjectsCollection;


