const path = require('path')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
  config.set({
    frameworks: [
      'jasmine',
      'karma-typescript'
    ],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-typescript',
      'karma-spec-reporter',
      'karma-coverage'
    ],

    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [
          require('karma-typescript-es6-transform')()
        ]
      },
      compilerOptions: {
        allowJs: true,
        module: 'commonjs',
        target: 'es5'
      }
    },

    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false
    },

    files: [
      { pattern: 'test/**/*.spec.ts' }
    ],

    preprocessors: {
      'test/**/*.spec.ts': ['karma-typescript'],
      'dist/**/*.js': ['coverage']
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : '.coverage-report/'
    },

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless']
  })
}
