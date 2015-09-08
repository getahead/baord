'use strict';

var TasksCollection,
    TaskModel = require('model/task.model');

TasksCollection = Backbone.Collection.extend({
    model     : TaskModel,
    projectID : '',
    url       : function () {
        return '/action/tasks/' + this.projectID;
    },

    initialize : function () {
        App.projectModel.on('change', function (model) {
            this.projectID = model.get('_id');
            this.fetch();
        }, this);
    }
});

module.exports = TasksCollection;