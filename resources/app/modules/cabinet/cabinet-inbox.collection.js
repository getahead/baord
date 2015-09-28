'use strict';

var CabinetInboxCollection,
    CabinetInboxItemModel = require('./cabinet-inbox-item.model');

CabinetInboxCollection = Backbone.Collection.extend({
    url   : '/action/inbox',
    model : CabinetInboxItemModel
});

module.exports = CabinetInboxCollection;