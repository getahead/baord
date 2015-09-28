'use strict';

var ProjectModel = Backbone.Model.extend({

    default : {
        'projectStatuses' : [
            'backlog',
            'analyzis',
            'ready for work',
            'in progress',
            'ready for test',
            'testing',
            'ready for deployment',
            'done'
        ]
    },

    initialize : function () {
    }
});

module.exports = ProjectModel;