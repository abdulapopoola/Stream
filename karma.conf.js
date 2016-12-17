module.exports = function (config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/**/*.js',
            'tests/**/*_spec.js'
        ],
        preprocessors: {
            'tests/**/*.js': ['jshint', 'browserify'],
            'src/**/*.js': ['jshint', 'browserify']
        },
        browsers: ['PhantomJS'],
        browserify: {
            debug: true,
            verbose: true
        },
        port: 9870,
        reporters: ['spec', 'html'],
        htmlReporter: {
            outputFile: 'tests/tests.html',
            pageTitle: 'Stream Unit Tests',
            subPageTitle: 'Stream tests',
            groupSuites: true,
            useCompactStyle: true
        }
    });
};
