'use strict';

var RootLayoutView,
    rootLayoutView;

RootLayoutView = Marionette.LayoutView.extend({
    regions : {
        menu : "#menu"
    }
});

rootLayoutView = new RootLayoutView({

});

module.exports = rootLayoutView;