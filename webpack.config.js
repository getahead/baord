var webpack = require('webpack'),
    path = require('path'),
    BowerWebpackPlugin = require('bower-webpack-plugin'),
    doT = require('dot-loader');

module.exports = {
    cache : true,

    entry : {
        main : path.join(__dirname, "resources/app/main")
    },

    output : {
        path                          : 'public/js',
        publicPath                    : "/js/",
        filename                      : "[name].js",
        chunkFilename                 : "[chunkhash].js",
        devtoolModuleFilenameTemplate : '/[resourcePath]'
    },

    resolve : {
        extensions : ['', '.js'],
        root       : 'resources/app'
    },
    module  : {
        loaders : [
            { test : /\.dot.html$/, loader : "dot-loader" }
        ]
    },
    plugins : [
        new BowerWebpackPlugin({
            modulesDirectories              : ["resources/vendor"],
            manifestFiles                   : "bower.json",
            includes                        : /.*.js$/,
            excludes                        : /.*.(css|less|styl)$/,
            searchResolveModulesDirectories : true
        }),

        new webpack.optimize.DedupePlugin(),

        new webpack.ProvidePlugin({
            $               : "jquery",
            jQuery          : 'jquery',
            'window.jQuery' : 'jquery',
            'window.$'      : 'jquery'
        }),

        new webpack.ProvidePlugin({
            'Backbone' : 'backbone'
        }),

        new webpack.ProvidePlugin({
            '_' : 'underscore'
        }),

        new webpack.ProvidePlugin({
            Marionette : "marionette"
        }),

        new webpack.ProvidePlugin({
            Cookies : "js-cookie"
        })

    ]
}