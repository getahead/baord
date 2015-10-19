'use strict';

var ProjectsCollection,
    ProjectModel = require('model/project.model');

ProjectsCollection = Backbone.Collection.extend({
    model : ProjectModel,
    url : '/action/projects',

    initialize : function () {
        //this.on('sync', this.sort, this);
    },


    /**
     *
     * @param newCurrentModel {Object || String=projectCode}
     * @returns {Object}
     */
    setCurrent : function (newCurrentModel) {
        var currentModel,
            oldCurrent;

        if (typeof newCurrentModel === 'string') {
            currentModel = this.findWhere({projectCode : newCurrentModel});

        } else if (typeof newCurrentModel === 'object' && newCurrentModel.cid) {
            currentModel = this.get(newCurrentModel);

        } else {
            throw new Error('set string or model');
        }

        if (!currentModel) throw new Error('Project not found');

        //oldCurrent = this.findWhere({current : true});
        //if (oldCurrent) {
        //    oldCurrent.set({current : false});
        //}
        //
        //currentModel.set({current : true});
        App.projectModel.set(currentModel.toJSON());
        return currentModel;
    }
});

module.exports = ProjectsCollection;


