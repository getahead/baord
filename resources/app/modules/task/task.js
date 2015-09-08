'use strict';

var Task,
    TaskModel = require('./task.model'),
    TaskView = require('./task.view');

Task = App.module('Task');

Task.TaskView = TaskView;
Task.TaskModel = TaskModel;

Task.on('start', function () {});

module.exports = Task;