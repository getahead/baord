'use strict';

var ProjectItemView,
    template = require('./templates/language-switcher-item.dot.html');

ProjectItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'language-switcher__item',

    triggers : {
        'click' : {
            event : 'language:choose',
            stopPropagation : false
        }
    },

    onShow : function () {
        this.$el.mod(this.model.get('id'), true);
    }
});

module.exports = ProjectItemView;