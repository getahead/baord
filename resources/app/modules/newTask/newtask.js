'use strict';

var NewTask,
    NewTaskView = require('./newtask.view');

NewTask = App.module('NewTask');

NewTask.View = NewTaskView;

NewTask.on('start', function () {});

module.exports = NewTask;