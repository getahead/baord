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
        'click .projects__select-more'   : '_handleExpandList'
    },

    reorderOnSort : true,

    childEvents: {
        'project:choose': function (view) {
            this._setCurrent.call(this, view);
        }
    },

    childViewOptions : function (model, index) {
        return {
            model : model,
            projectModel : this.model
        }
    },

    initialize : function () {
        this.collection.comparator = function (model) {
            return model.get('_id') !== App.projectModel.get('_id') ? 1 : -1;
        };

        this.collection.sort();
    },

    _setCurrent : function (view) {
        App.appRouter.navigate('/browse/' + view.model.get('projectCode'), {trigger : true});
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

    _handleExpandList : function (e) {
        var $select;

        $select = this.$el.elem('select');
        $select.mod('expand', true);

        event.stopPropagation();

        $('body').one('click', function () {
            $select.mod('expand', false);
        })
    }
});

module.exports = ProjectsView;