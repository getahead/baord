'use strict';

var LanguageSwitcher,
    languagesCollection,
    LanguageSwitcherView = require('./language-switcher.view');

LanguageSwitcher = App.module('LanguageSwitcher');

LanguageSwitcher.View = LanguageSwitcherView;

App.addRegions({
    languageSwitcherRegion: '.page__header-language-switcher'
});

languagesCollection = new Backbone.Collection([
    {id : 'en', lang : 'en-US'},
    {id : 'ru', lang : 'ru-RU'}
]);

App.languageSwitcherRegion.show(new LanguageSwitcher.View({
    collection : languagesCollection
}));

LanguageSwitcher.on('start', function () {});

module.exports = LanguageSwitcher;