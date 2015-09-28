'use strict';

var ProjectsView,
    ProjectsItemView = require('./projects.item.view'),
    template = require('./templates/projects.dot.html');

ProjectsView = Marionette.CompositeView.extend({
    template           : template,
    className          : 'projects',
    childViewContainer : '.projects__items',
    childView          : ProjectsItemView,

    events : {
        'click .projects__button_create' : '_handleNewTask',
        'click .projects__link'          : '_navigate'
    },

    reorderOnSort : true,

    collectionEvents : {
        'change' : '_collectionChanged'
    },

    modelEvents : {
        'change' : 'render'
    },

    childEvents: {
        'project:choose': function (view) {

            this.collection.each(this._setCurrent.bind(this, view));
        }
    },

    childViewOptions : function (model, index) {
        return {
            model : model,
            projectModel : this.model
        }
    },

    initialize : function () {
        this.collection.comparator = function (collection) {
            return !collection.get('current');
        };

        this.collection.sort();
        this.model.on('change', this.render);
        App.appRouter.on('route', this._setState, this);
    },

    _setCurrent : function (view, model) {
        if (model.get('_id') == view.model.get('_id')) {
            App.projectModel.set(model.toJSON());
            $.cookie("project", model.get('_id'), {path: '/', expire : 365});

            this._navigate();
            return model.set('current', true);
        }

        model.set('current', false);
    },

    _setState : function (router) {
        var $linkToProject = this.$el.elem('link');

        if (Backbone.history.atRoot()) {
            $linkToProject.mod('back', false);
        } else {
            $linkToProject.mod('back', 'active');
        }
    },

    _navigate : function (e) {
        if (e) {
            e.preventDefault();
        }

        App.appRouter.navigate('/', {trigger : true});
    },

    _collectionChanged : function () {
        this.collection.sort();
    },

    _handleNewTask : function () {
        var newTaskView = new App.NewTask.View({
            collection   : App.tasksCollection,
            projectModel : this.model,
            projectsCollection : this.collection
        });

        App.popupRegion.show(newTaskView)
    },

    onRender : function () {
        this._setState();
    }
});

module.exports = ProjectsView;