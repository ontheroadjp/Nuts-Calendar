var webpackConfig = require('../../build/webpack.test.karma.conf')
//process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
//        browsers: ['ChromeHeadless', 'Firefox'],
//        browsers: ['Chrome', 'Firefox'],
//        browsers: ['ChromeHeadless'],
        browsers: ['Chrome'],
//        browsers: ['Firefox'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: [
            '../../node_modules/es6-promise/dist/es6-promise.auto.js',
            './index.js'
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
//        logLevel: config.LOG_DISABLE,
//        logLevel: config.LOG_ERROR,
        logLevel: config.LOG_WARN,
//        logLevel: config.LOG_INFO,
//        logLevel: config.LOG_DEBUG,
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}
