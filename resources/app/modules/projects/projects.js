'use strict';

var Projects,
    ProjectsView = require('./projects.view');

Projects = App.module('Projects');

Projects.View = ProjectsView;

Projects.on('start', function () {});

module.exports = Projects;