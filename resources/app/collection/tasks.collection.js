'use strict';

var TasksCollection;

TasksCollection = Backbone.Collection.extend({
    model     : Backbone.Model,
    projectID : '',
    url       : '/action/tasks',

    initialize : function () {
        this.fetch({reset : true});
        //        console.log('initialized')
        //
        //        this.projectID.on('change', function () {
        //            this.fetch({reset : true});
        //        });
        //
        //        this.on('sync', function (data) {
        //            console.log(data);
        //        })
    }
});

module.exports = TasksCollection;