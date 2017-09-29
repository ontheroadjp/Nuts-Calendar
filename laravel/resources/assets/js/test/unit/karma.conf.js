var webpackConfig = require('../../build/webpack.test.conf')
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
//    browsers: ['PhantomJS', 'ChromeHeadless', 'Firefox'],
//    browsers: ['PhantomJS'],
//    browsers: ['Chrome'],
    browsers: ['ChromeHeadless'],
//    browsers: ['Firefox'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
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
//    logLevel: config.LOG_INFO,
    logLevel: config.DEBUG,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
