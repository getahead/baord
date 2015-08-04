'use strict';

var ProjectItemView = require('./project.item.view'),
    template = require('../../templates/projectsList.hbs.html'),
    ProjectsView;


ProjectsView = Marionette.CompositeView.extend({
    template  : template,
    childViewContainer : '.projects__items',
    childView : ProjectItemView,

    modelEvents: {
        "change" :  "modelChanged"
    },

    initialize : function () {
        var that = this;

        this.collection.on('sync', function (data){

            that.model.set(data.at(0).toJSON());
        });
    },

    modelChanged : function () {
        console.log('model changed');
    }
});


module.exports = ProjectsView;

