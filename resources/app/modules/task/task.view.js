'use strict';

var TaskView,
    template = require('./templates/task.dot.html');

TaskView = Marionette.ItemView.extend({
    template : template,
    className : 'task',

    modelEvents: {
        'sync' : '_synchronized'
    },

    initialize : function () {
        this.model.fetch();
    },

    _synchronized : function () {
        var projectModel = App.projectsCollection.findWhere({_id : this.model.get('projectId')});

        App.projectModel.set(projectModel.toJSON());
        this.render();
    },

    onAttach : function () {

        this.$el.addClass('loading');
    },

    onRender : function () {
        this.$el.removeClass('loading');
    }

});

module.exports = TaskView;