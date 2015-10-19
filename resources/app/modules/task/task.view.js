'use strict';

var TaskView,
    template = require('./templates/task.dot.html');

TaskView = Marionette.ItemView.extend({
    template : template,
    className : 'task',

    modelEvents: {
        'sync' : '_synchronized'
    },

    ui : {
        'edit'   : '.task__act.task__act_edit',
        'save'   : '.task__act.task__act_save',
        'cancel' : '.task__act.task__act_cancel'
    },

    events : {
        'click @ui.edit'   : '_editStart',
        'click @ui.save'   : '_editSave',
        'click @ui.cancel' : '_editCancel'
    },

    initialize : function () {
        this.model.fetch();
    },

    _getContainer : function (elem) {
        return $(elem).closest('.task__value').ctx('task__value');
    },

    _editStart : function (e) {
        var $container,
            $field;

        $container = this._getContainer(e.currentTarget);
        $field = $container.elem('value-item');

        $container.mod('state', 'edit');

        $field.attr('data-source', $field.text())
            .attr('contenteditable', true)
            .focus();
    },

    _editCancel : function (e) {
        var $container,
            $field;

        $container = this._getContainer(e.currentTarget);
        $field = $container.elem('value-item');

        $container.mod('state', false);

        $field.text($field.attr('data-source'))
            .attr('contenteditable', false);

        //this.$el.one('click', function(e) {
        //    if ($(e.currentTarget) !== $field)
        //})
    },

    _synchronized : function () {
        var projectModel = App.projectsCollection.findWhere({_id : this.model.get('projectId')});

        App.projectModel.set(projectModel.toJSON());
        this.model.set('project', projectModel.toJSON());
        this.render();
    },

    onAttach : function () {

        this.loadingTimeout = setTimeout(function () {
            this.$el.addClass('loading');
        }.bind(this), 300);
    },

    onRender : function () {
        clearTimeout(this.loadingTimeout);
        this.$el.removeClass('loading');
    }

});

module.exports = TaskView;