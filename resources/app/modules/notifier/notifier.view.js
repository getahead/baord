'use strict';

var NotifierView,
    template = require('./templates/notifier-view.dot.html');

NotifierView = Marionette.ItemView.extend({
    template  : template,
    className : 'notifier',

    ui : {
        'messages' : '.notifier__messages',
        'close'    : '.notifier__close'
    },

    events : {
        'click @ui.close' : 'destroy'
    },

    initialize : function () {
        this.$el.mod(this.model.get('type'), true)
    },

    _setScroll : function () {
        var k = -1;

        var animateMessages = function () {
            if (!this.$el) return;

            var blockHeight = this.$el.outerHeight(),
                messagesHeight = this.ui.messages.height(),
                marginTop = parseInt(this.ui.messages.css('margin-top'));

            if (messagesHeight - k * marginTop == blockHeight || (k == 1 && marginTop == 0)) {
                k = k * -1;
            }

            this.ui.messages.css('margin-top', marginTop + k * blockHeight);

            this._timeout = setTimeout(animateMessages.bind(this), 2000);
        }

        animateMessages.call(this);
    },

    onDestroy : function () {
        clearTimeout(this._timeout);
    },

    onRender : function () {
        var errorsCount = _.size(this.model.get('messages'));

        if (!this.model.get('waitForClose')) {

            setTimeout(function () {
                this.$el.fadeOut(1000, this.destroy.bind(this));
            }.bind(this), errorsCount * 4 * 1000);
        }

        if (errorsCount < 2) return;

        this._setScroll();
    }
});

module.exports = NotifierView;