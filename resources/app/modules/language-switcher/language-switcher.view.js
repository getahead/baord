'use strict';

var LanguageSwitcherView,
    LanguageSwitcherItemView  = require('./language-switcher.item.view');

LanguageSwitcherView = Marionette.CollectionView.extend({
    className : 'language-switcher',
    childView : LanguageSwitcherItemView,

    childEvents : {
        'language:choose' : function (view) {
            this.setLang(view.model);
        }
    },

    initialize : function () {
        this.collection.comparator = function (model) {
            return model.get('lang') !== $.cookie('i18next') ? 1 : -1;
        };

        this.collection.sort();
    },

    setLang : function (model) {
        $.cookie('i18next', model.get('lang'), {path: '/', expire : 365});

        document.location.reload();
    }

});

module.exports = LanguageSwitcherView;