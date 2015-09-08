'use strict';

var TaskModel;


TaskModel = Backbone.Model.extend({

    idAttribute: '_id',

    defaults : {
        status : 0
    },

    initialize : function () {

    }
});

module.exports = TaskModel;