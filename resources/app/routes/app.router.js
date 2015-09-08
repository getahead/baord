'use strict';

var AppRouter;

AppRouter = Marionette.AppRouter.extend({
    controller : {
        start : function () {
            var projectsView = new App.Projects.View({
                collection : App.projectsCollection,
                model      : App.projectModel
            });

            App.headerRegion.show(projectsView);
        },

        index : function () {
            var tasksView;

            tasksView = new App.Tasks.TasksStatusesCollectionView({
                model           : App.projectModel,
                tasksCollection : App.tasksCollection
            });

            App.mainRegion.show(tasksView);
        },

        task : function (taskId) {
            var taskView,
                taskModelAttributes;

            taskModelAttributes = _.extend({_id : taskId});

            taskView = new App.Task.TaskView({
                model : new  App.Task.TaskModel(taskModelAttributes)
            });

            App.mainRegion.show(taskView);
        }
    },

    start : function () {
        this.controller.start.apply(this);
    },

    appRoutes : {
        '(:projectId)'     : 'index',
        'task/:taskId'     : 'task'
    }
});

module.exports = AppRouter;