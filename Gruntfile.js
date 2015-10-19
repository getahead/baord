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
            options: {
                paths: ['./'],
                relativeDest: 'public/style',
                'include css' : true,
                urlfunc: 'embedurl',
                import: [
                    'node_modules/nib/index',
                    'resources/stylus/includes/variables'
                ]
            },
            dev: {
                files: {
                    'layout.css': [
                        'resources/stylus/layout.styl',
                        'resources/app/modules/**/styles/*.styl'
                    ],
                    'plugins.css' : ['resources/app/plugins/redactorjs/redactor.styl']
                }
            },
            prod: {
                files: {
                    'layout.css': [
                        'resources/stylus/layout.styl',
                        'resources/app/modules/**/styles/*.styl',
                        'resources/app/plugins/redactorjs/redactor.styl'
                    ]
                }
            }
        },

        cssmin: {
            options: {
                report : ['min', 'gzip']
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/style/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/style/'
                }]
            }
        },

        uncss: {
            dist: {
                files: {
                    'dist/css/tidy.css': ['public/html/index.html']
                }
            }
        },

        modernizr: {
            dist: {
                //cache : true,
                dest : "public/js/modernizr-custom.js",
                matchCommunityTests: true,
                tests : ['pointerevents', 'touchevents', 'setclasses', 'teststyles', 'domprefixes'],

                uglify: true
            }
        },

        jade: {
            dev: {
                options: {
                    data: {
                        debug: true,
                        timestamp: "<%= grunt.template.today() %>",
                        env: 'development'
                    }
                },
                files: {
                    "public/html/index.html": "resources/views/*.jade"
                }
            },
            prod : {
                files: {
                    "public/html/index.html": "resources/views/*.jade"
                }
            }
        },

        watch: {
            app: {
                files: ['public/**/*', 'resources/**/*'],
                tasks: ['webpack:build-dev', 'stylus:dev', 'jade:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['webpack:build-dev', 'stylus:dev', 'jade:dev', 'watch:app']);

    // Production build
    grunt.registerTask('build', ['webpack:build', 'stylus:prod', 'jade:prod', 'cssmin']);
}