'use strict';
module.exports = function(grunt) {
 
    grunt.initConfig({
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
        }
    });
 
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    
    grunt.registerTask('default', 'mocha_phantomjs');
    grunt.registerTask('genDoc', 'jsdoc2md');
};