'use strict';


var NewTaskView,
    TaskModel = require('model/task.model'),
    template = require('./templates/newtask.dot.html');

NewTaskView = Marionette.ItemView.extend({
    template  : template,
    className : 'newtask',

    ui : {
        'buttonCancel' : '.newtask__button_cancel',
        'buttonCreate' : '.newtask__button_create',
        'form'         : '.newtask__form'
    },

    events : {
        'click .newtask__overlay, @ui.buttonCancel' : 'handleClose',
        'submit @ui.form'                           : '_handleSubmit'
    },

    initialize : function (options) {
        this.model = new TaskModel();

        this.projectModel = options.projectModel;
        this.projectsCollection = options.projectsCollection;

        this.listenTo(this.projectModel, 'change', this.render);
    },

    handleClose : function (e) {
        this.destroy();
    },

    _handleSubmit : function (e) {
        e.preventDefault();

        var data = Backbone.Syphon.serialize(this.ui.form);
        this.model.set(data);
        this.collection.create(this.model, {
            wait: true,
            success : this._requestSuccess
        });

        this.handleClose();

        return false;
    },

    _requestSuccess : function (model, res) {

    },

    templateHelpers : function () {
        return {
            projectId   : this.projectModel.get('_id'),
            projectName : this.projectModel.get('projectName'),
            statuses    : this.projectModel.get('projectStatuses')
        }
    }
});


module.exports = NewTaskView;