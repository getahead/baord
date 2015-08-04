'use strict';

var ProjectItemView,
    template = require('../../templates/project.item.hbs.html');

ProjectItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'projects__item',

    initialize : function () {

    }
});

module.exports = ProjectItemView;