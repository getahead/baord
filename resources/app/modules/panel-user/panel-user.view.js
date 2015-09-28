'use strict';

var MenuView,
    template = require('./templates/panel-user-view.dot.html');

MenuView = Marionette.ItemView.extend({
    template  : template,
    className : 'panel-user',

    ui : {
        menuItem : '.panel-user__item',
        menuMain : '.panel-user__main',
        logout   : '.panel-user__logout',
        user     : '.panel-user__user'
    },

    events : {
        'click @ui.menuItem, @ui.menuMain, @ui.user' : '_navigate',
        'click @ui.logout'   : '_logout'
    },

    initialize : function () {
        this.listenTo(this.model, 'change', this.render);
    },

    _logout : function () {
        this.model.logout();
    },

    _navigate : function (e) {
        e.preventDefault();

        var $elem,
            href;

        $elem  = $(e.currentTarget);
        href   = $elem.attr('href');

        App.appRouter.navigate(href, {trigger : true});
    }
});

module.exports = MenuView;