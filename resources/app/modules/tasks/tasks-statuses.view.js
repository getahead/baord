'use strict';

var TasksStatusesCollectionView,
    TasksColView = require('./tasks-col.view'),
    template = require('./templates/tasks-table.dot.html');

TasksStatusesCollectionView = Marionette.CompositeView.extend({
    template  : template,
    className : 'tasks',
    collection: new Backbone.Collection(),

    childView          : TasksColView,
    childViewContainer : '.tasks__row',

    childViewOptions : function (model, index) {
        return {
            collection : this.tasksCollection,
            statusId   : model.get(0),
            status     : model.get(1)
        }
    },


    initialize : function (options) {
        this.tasksCollection = options.tasksCollection;

        this._setCollection();
        this.model.on('change:projectStatuses', this._setCollection, this);
    },

    _setCollection : function () {
        var statuses = _.pairs(this.model.get('projectStatuses'));

        this.collection.set(statuses);
    }

});

module.exports = TasksStatusesCollectionView;