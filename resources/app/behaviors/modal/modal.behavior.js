'use strict';

var ModalBehavior;

ModalBehavior = Marionette.Behavior.extend({
    className : 'modal',

    ui : {
        overlay : '.modal__overlay'
    },

    events : {
        'click  @ui.buttonCancel' : 'onHandleClose',
        'click  @ui.overlay'      : '_handleOverlayClickClose',
        'keyup'                   : '_handleKeyPressClose'
    },

    _handleOverlayClickClose : function () {
        if (this.options.disableClickOverlay) return;

        return this.onHandleClose();
    },

    _handleKeyPressClose : function (e) {
        if (this.options.disableEscapeOverlay) return;

        if (e.keyCode == 27) {
            return this.onHandleClose();
        }
    },

    onHandleClose : function (e) {
        this.view.destroy();
    },

    onRender : function () {
        var $overlay = $('<div/>').addClass(this.className + '__overlay');

        this.$el
            .addClass(this.className)
            .prepend($overlay)
            .elem('container')
            .addClass(this.className + '__container');
    }

});

module.exports = ModalBehavior;