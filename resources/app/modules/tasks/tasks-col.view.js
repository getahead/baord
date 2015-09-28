'use strict';

var TasksColView,
    TasksItemView = require('./tasks.item.view'),
    template = require('./templates/tasks-col.dot.html');

TasksColView = Marionette.CompositeView.extend({
    template           : template,
    childView          : TasksItemView,
    childViewContainer : '.tasks__container',

    className : 'tasks__col',

    childEvents: {
        'change:status'       : '_statusChanged',
        'change:rollback:dom' : '_append'
    },

    initialize : function (options) {
        this.statusId = options.statusId;
        this.model.set('status', options.status);

        this.listenTo(Backbone, 'statusChange', function (req) {
            if (req.newStatus === this.statusId) {
                this.render();
            }
        }, this);
    },

    filter: function (child, index, collection) {
        return child.get('status') == this.statusId;
    },

    _statusChanged : function (view) {
        Backbone.trigger('statusChange', { newStatus : view.model.get('status')});
        this.render();
    },

    _append : function (view) {
        this.$el.append(view.$el);
    },

    onRender : function () {
        this.$el.attr('data-status-id', this.statusId);
    }
});

module.exports = TasksColView;


