'use strict';

var ProjectModel = require('../model/project.model'),
    ProjectsCollection;

ProjectsCollection = Backbone.Collection.extend({
    model : ProjectModel
});

module.exports = ProjectsCollection;


