'use strict';

var TasksCollection,
    TaskModel = require('model/task.model');

TasksCollection = Backbone.Collection.extend({
    model     : TaskModel,
    projectID : '',

    url : function () {
        return '/action/tasks/' + this.projectCode;
    },

    initialize : function () {
        App.projectModel.on('change', this._syncTasks, this);
    },

    _syncTasks : function (model) {
        this.projectCode = model.get('_id');
        this.fetch();
    }
});

module.exports = TasksCollection;