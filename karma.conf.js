var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        browserify: {
            debug: true,
            transform: [
                istanbul({
                    ignore: ['**/node_modules/**']
                })
            ],
            verbose: true
        },
        browsers: ['PhantomJS'],
        coverageReporter: {
            // type: 'html',
            dir: 'tests/coverage/',
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'lcov',
                subdir: './'
            }]
        },
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/**/*.js',
            'tests/**/*_spec.js'
        ],
        preprocessors: {
            'tests/**/*.js': ['jshint', 'browserify'],
            'src/**/*.js': ['jshint', 'browserify']
        },
        port: 9870,
        reporters: [
            'spec',
            'html',
            'coverage',
            'threshold'
        ],
        htmlReporter: {
            outputFile: 'tests/tests.html',
            pageTitle: 'Stream Unit Tests',
            subPageTitle: 'Stream tests',
            groupSuites: true,
            useCompactStyle: true
        },
        thresholdReporter: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90
        }
    });
};
