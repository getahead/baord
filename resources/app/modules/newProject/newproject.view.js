'use strict';


var NewProjectView,
    ProjectModel = require('model/project.model'),
    template = require('./templates/newproject.dot.html');

NewProjectView = Marionette.ItemView.extend({
    template  : template,
    className : 'newproject',

    ui : {
        'buttonCancel' : '.newproject__button_cancel',
        'buttonCreate' : '.newproject__button_create',
        'form'         : '.newproject__form',
        'textarea'     : '.newproject__form-textarea'
    },

    events : {
        'submit @ui.form' : '_handleSubmit'
    },

    behaviors : {
        ModalBehavior : {

        }
    },

    initialize : function (options) {
        if (!options.projectModel) return;

        this.model = new ProjectModel();
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

    onShow : function () {
        $('.newproject__form-input:first', this.$el).focus();
    },

    onRender : function () {
        if ($.fn.redactor) {
            this.ui.textarea.redactor();
        }
    }

});


module.exports = NewProjectView;