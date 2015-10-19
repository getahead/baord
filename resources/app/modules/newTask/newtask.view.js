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
        'form'         : '.newtask__form',
        'textarea'     : '.newtask__form-textarea'
    },

    events : {
        'submit @ui.form'         : '_handleSubmit'
    },

    behaviors : {
        ModalBehavior : {
            disableClickOverlay  : true,
            disableEscapeOverlay : true
        }
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

        this.collection.create(data, {
            wait    : true,
            success : this._requestSuccess.bind(this)
        });

        this.handleClose();

        return false;
    },

    _requestSuccess : function (model, res) {
        this.model.set(res);
    },

    templateHelpers : function () {
        return {
            projectId   : this.projectModel.get('_id'),
            projectName : this.projectModel.get('projectName'),
            statuses    : this.projectModel.get('projectStatuses')
        }
    },

    onShow : function () {
        $('.newtask__form-input:first', this.$el).focus();
    },

    onRender : function () {
        if ($.fn.redactor) {
            this.ui.textarea.redactor();
        }
    }

});


module.exports = NewTaskView;