module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            './test/*.test.js'
        ],
        exclude: [],
        preprocessors: {
            "./test/*.test.js": ["webpack"]
        },
        // webpack configuration
        webpack: require("./webpack.base.config.js"),
        webpackMiddleware: {
            stats: "errors-only"
        },
        reporters: ['progress'],
        listenAddress: 'localhost',
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Firefox'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        concurrency: Infinity
    });
};