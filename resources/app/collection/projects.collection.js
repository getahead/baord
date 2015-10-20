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
        var currentModel;

        if (typeof newCurrentModel === 'string') {
            currentModel = this.findWhere({projectCode : newCurrentModel});

        } else if (typeof newCurrentModel === 'object' && newCurrentModel.cid) {
            currentModel = this.get(newCurrentModel);

        } else {
            throw new Error('set string or model');
        }

        if (!currentModel) throw new Error('Project not found');

        App.projectModel.set(currentModel.toJSON());
        return currentModel;
    },

    xhrError : function (model, xhr) {
        if (!xhr || xhr.status == 404) {
            App.channel.trigger('notify:event', {
                type : 'error',
                messages  : {
                    notFound : {
                        message : i18n.t('basic.message.unexpected_error')
                    }
                }
            });

            return;
        }

        App.channel.trigger('notify:event', {
            type : 'error',
            name : xhr.responseJSON.name,
            messages  : xhr.responseJSON.errors
        });
    }
});

module.exports = ProjectsCollection;


