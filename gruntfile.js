'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        asciify: {
            banner: {
                text: 'streamJS',
                options: {
                    font: 'ogre',
                    log: true
                }
            }
        },
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
                '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                '!\n<%= asciify_banner %> \n*/ \n',
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
                unused: true,
                undef: true,
                nonew: true,
                nonbsp: true,
                latedef: true,
                forin: true,
                eqnull: true,
                browser: true,
                devel: true
            },
            all: ['stream.js', 'spec/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-asciify');

    grunt.registerTask('test', 'mocha_phantomjs');
    grunt.registerTask('doc', 'jsdoc2md');
    grunt.registerTask('min', 'uglify');
    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('default', ['test', 'lint', 'asciify', 'min', 'doc'])
};