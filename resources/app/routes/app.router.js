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
            });

            App.headerProjectRegion.show(projectsView);
            App.headerUserRegion.show(panelUserView);
        },

        board : function (projectCode) {
            var tasksView;

            App.projectsCollection.setCurrent(projectCode);

            tasksView = new App.Tasks.TasksStatusesCollectionView({
                model           : App.projectModel,
                tasksCollection : App.tasksCollection
            });

            App.mainRegion.show(tasksView);
        },

        task : function (projectId, taskId) {
            var taskView,
                taskModel;

            App.projectsCollection.setCurrent(projectId);
            taskModel = new App.Task.TaskModel({taskId : taskId});

            taskView = new App.Task.TaskView({
                model : taskModel
            });

            App.mainRegion.show(taskView);
        },

        notfound : function () {
            App.mainRegion.show(new App.NotFound.View());
        }
    },

    initialize : function () {

        this.appRoute(/^browse\/([a-zA-Z]+)?/,      'board');
        this.appRoute(/^browse\/([a-zA-Z]+)-(\d+)/, 'task');
    },

    start : function () {
        this.controller.start.apply(this);
    },

    appRoutes : {
        //'(:projectId)'     : 'index',
        //'task/:taskId'     : 'task',

        //'*notfound' : 'notfound'
    }
});

module.exports = AppRouter;