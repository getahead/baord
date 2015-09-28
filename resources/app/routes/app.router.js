'use strict';

var AppRouter;

AppRouter = Marionette.AppRouter.extend({
    controller : {
        start : function () {
            var projectsView,
                panelUserView;

            projectsView = new App.Projects.View({
                collection : App.projectsCollection,
                model      : App.projectModel
            });

            panelUserView = new App.PanelUser.View({
                model : App.userModel
            })

            App.headerProjectRegion.show(projectsView);
            App.headerUserRegion.show(panelUserView);
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
        },

        notfound : function () {
            App.mainRegion.show(new App.NotFound.View());
        }
    },

    start : function () {
        this.controller.start.apply(this);
    },

    appRoutes : {
        '(:projectId)'     : 'index',
        'task/:taskId'     : 'task',

        '*notfound' : 'notfound'
    }
});

module.exports = AppRouter;