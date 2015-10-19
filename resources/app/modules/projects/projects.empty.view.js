'use strict';

var ProjectItemView,
    template = require('./templates/project-empty.dot.html');

ProjectItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'projects__item',

    modelEvents : {
        "change" : "render"
    },

    triggers : {
        'click' : {
            event : 'project:create',
            stopPropagation : false
        }
    },

    onRender : function () {
        this.$el.mod('empty', true);
    }
});

module.exports = ProjectItemView;