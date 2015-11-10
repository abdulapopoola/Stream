'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc2md: {
            oneOutputFile: {
                src: 'stream.js',
                dest: 'api/documentation.md'
            }
        },
        mocha_phantomjs: {
            options: {
                config: {
                    useColors: true
                }
            },
            all: ['tests.html']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
                mangle: true,
                compress: true,
                report: 'min',
                preserveComments: false,
                mangleProperties: false,

            },
            target: {
                files: {
                    'stream.min.js': ['stream.js']
                }
            }
        },
        jshint: {
            options: {
                unused:true,
                undef: true,
                nonew: true,
                nonbsp: true,
                latedef: true,
                forin: true,
                eqnull: true,
                browser: true,
                devel: true
            },
            all: ['stream.js']
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', 'mocha_phantomjs');
    grunt.registerTask('jsdoc2md', 'jsdoc2md');
    grunt.registerTask('min', 'uglify');
    grunt.registerTask('lint', 'jshint');
};