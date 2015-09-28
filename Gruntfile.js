module.exports = function (grunt) {
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    var path = require('path'),
        webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js');

    grunt.initConfig({
        webpack : {
            options : webpackConfig,
            build : {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        'process.env': {
                            // This has effect on the react lib size
                            'NODE_ENV': JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        report : ['min', 'gzip']
                    })
                )
            },
            'build-dev' : {
                devtool : 'sourcemap',
                debug   : true
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: ['./'],
                    relativeDest: 'public/style',
                    urlfunc: 'embedurl',
                    import: [
                        'node_modules/nib/index',
                        'resources/stylus/includes/variables'
                    ]
                },
                files: {
                    'layout.css': ['resources/stylus/layout.styl', 'resources/app/modules/**/styles/*.styl']
                }
            }
        },
        watch: {
            app: {
                files: ['public/**/*', 'resources/**/*'],
                tasks: ['webpack:build-dev', 'stylus:compile'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['webpack:build-dev', 'stylus:compile', 'watch:app']);

    // Production build
    grunt.registerTask('build', ['webpack:build', 'stylus:compile']);
}