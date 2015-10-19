'use strict';

var ProjectItemView,
    template = require('./templates/project-item.dot.html');

ProjectItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'projects__item',

    modelEvents : {
        "change" : "render"
    },

    triggers : {
        'click' : {
            event : 'project:choose',
            stopPropagation : false
        }
    },

    initialize : function (options) {
        this.projectModel = options.projectModel;
    },

    onRender : function () {
        this.setCurrent();
    },

    setCurrent : function () {
        if (this.model.get('current')) {
            this.$el.mod('current', true);
        } else {
            this.$el.mod('current', false);
        }
    }
});

module.exports = ProjectItemView;