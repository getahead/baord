'use strict';

var NotFoundView,
    template = require('./templates/notfound.dot.html');

NotFoundView = Marionette.ItemView.extend({
    template  : template,
    className : 'notfound'


});

module.exports = NotFoundView;