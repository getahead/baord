'use strict';

var TaskModel;

TaskModel = Backbone.Model.extend({
    idAttribute: '_id',
    url : function () {
        return '/action/task/' + App.projectModel.get('_id') + '/' + this.get('taskId')
    },

    initialize : function () {
    }
});

module.exports = TaskModel;