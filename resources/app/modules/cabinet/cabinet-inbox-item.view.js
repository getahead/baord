'use strict';

var CabinetInboxItemView,
    template = require('./templates/cabinet-inbox-item-view.dot.html');

CabinetInboxItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'cabinet-inbox__item',

    triggers : {
        'click .cabinet-inbox__delete' : 'inbox:delete'
    }
});

module.exports = CabinetInboxItemView;