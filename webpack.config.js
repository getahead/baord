var webpack = require('webpack'),
    path = require('path');

module.exports = {
    cache : true,

    entry : {
        main : "./resources/app/main"
    },

    output : {
        path          : 'public/javascripts',
        publicPath    : "/javascript/",
        filename      : "[name].js",
        chunkFilename : "[chunkhash].js"
    },

    resolve : {
        extensions : ['', '.js'],
        root: [path.join(__dirname, "resources/vendor")]
    },
    plugins : [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.ProvidePlugin({
            _ : "underscore"
        })
    ]
}