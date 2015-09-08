'use strict';

var TaskModel;

TaskModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot : '/action/task/',

    initialize : function () {
    }
});

module.exports = TaskModel;