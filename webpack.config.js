var webpack = require('webpack'),
    path = require('path'),
    handlebars = require('handlebars-loader');

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
        root       : [path.join(__dirname, "resources/vendor")],
        alias      : {
            jquery     : 'jquery/dist/jquery',
            underscore : 'underscore/underscore',
            backbone   : 'backbone/backbone',
            marionette : 'marionette/lib/backbone.marionette'
        }
    },
    module: {
        loaders: [{ test: /\.hbs.html$/, loader: "handlebars-loader" }]
    },
    plugins : [
        new webpack.ProvidePlugin({
            $               : "jquery",
            jQuery          : "jquery",
            "window.jQuery" : "jquery",
            "root.jQuery"   : "jquery"
        }),
        new webpack.ProvidePlugin({
            _ : "underscore"
        }),
        new webpack.ProvidePlugin({
            Marionette : "marionette"
        })
    ]
}