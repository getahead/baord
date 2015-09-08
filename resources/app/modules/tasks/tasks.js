'use strict';

var Tasks,
    TasksStatusesCollectionView = require('./tasks-statuses.view');

Tasks = App.module('Tasks');

Tasks.TasksStatusesCollectionView = TasksStatusesCollectionView;

Tasks.on('start', function () {});

module.exports = Tasks;