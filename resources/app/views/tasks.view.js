'use strict';

var template = require('../../templates/tasksView.hbs.html'),
    TasksView;

TasksView = Marionette.CompositeView.extend({
    template : template,

    initialize : function () {
        console.log('ololo')
    }
});


module.exports = TasksView;