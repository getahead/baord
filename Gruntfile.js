module.exports = function (grunt) {
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    var path = require('path'),
        webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js');

    grunt.initConfig({
        webpack : {
            options : webpackConfig,
            build : {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                )
            },
            'build-dev' : {
                devtool : 'sourcemap',
                debug   : true
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: "/" + webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "eval",
                    debug: true
                }
            }
        },
        watch: {
            app: {
                files: ["public/**/*", "resources/**/*"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', []);

    grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);
}