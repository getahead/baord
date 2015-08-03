require('marionette');


var BodyView = Backbone.Marionette.ItemView.extend({
    template : false,

    initialize : function () {
        console.log('here we can see');
        console.log($);
    }
})

var bodyView = new BodyView({
    el : $('body')
})