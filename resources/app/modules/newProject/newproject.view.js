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

        'statusesList' : '.newproject__list',
        'buttonRemove' : '.newproject__list-item:not(:last) .newproject__list-button',
        'buttonAdd'    : '.newproject__list-item:last .newproject__list-button'
    },

    events : {
        'submit @ui.form'        : '_handleSubmit',
        'click @ui.buttonAdd'    : '_addProjectStatusesInput',
        'click @ui.buttonRemove' : '_removeProjectStatusesInput'

    },

    behaviors : {
        ModalBehavior : {}
    },

    initialize : function (options) {
        this.model = new ProjectModel();
        this.projectsCollection = options.projectsCollection;

        this.listenTo(this.projectModel, 'change', this.render);
    },

    _addProjectStatusesInput : function (e) {
        var $container,
            $clone;

        $container = $(e.currentTarget).closest('.newproject__list-item');
        $clone = $container.clone();

        this.ui.statusesList.append($clone);

        $('input', $clone)
            .val('')
            .focus();
    },

    _removeProjectStatusesInput : function (e) {
        var $container;

        $container = $(e.currentTarget).closest('.newproject__list-item');
        $container.remove();
    },


    // XHR

    _handleSubmit : function (e) {
        e.preventDefault();

        var data = Backbone.Syphon.serialize(this.ui.form);

        this.collection.create(data, {
            wait    : true,
            success : this._requestSuccess.bind(this),
            error   : this.collection.xhrError.bind(this)
        });

        return false;
    },

    _requestSuccess : function (model, res) {

        this.collection.setCurrent(model);
        this.triggerMethod('handleClose');

        App.appRouter.navigate('/browse/' + model.get('projectCode'), {trigger : true});

        App.channel.trigger('notify:event', {
            type : 'success',
            name : 'Data changed',
            messages  : {
                fields : {
                    message : 'Project <strong>' + model.get('projectName') +'</strong> ' +
                    'has just created and it has an ID ' + model.get('projectCode') + '. We wish you a greate work.'
                }
            }
        });
    },

    onShow : function () {
        $('.newproject__form-input:first', this.$el).focus();
    }

});


module.exports = NewProjectView;