'use strict';

var NewProject,
    NewProjectView = require('./NewProject.view');

NewProject = App.module('NewProject');

NewProject.View = NewProjectView;

NewProject.on('start', function () {});

module.exports = NewProject;