"use strict";
module.exports = function(grunt) {
 
    grunt.initConfig({
        jsdoc2md: {
            oneOutputFile: {
                src: "stream.js",
                dest: "api/documentation.md"
            }
        }
    });
 
    grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
    grunt.registerTask("default", "jsdoc2md");
};