'use strict';

var ProjectsCollection,
    ProjectModel = require('model/project.model');

ProjectsCollection = Backbone.Collection.extend({
    model : ProjectModel,
    url : '/action/projects'
});

module.exports = ProjectsCollection;


