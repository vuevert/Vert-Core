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

    karmaTypescriptConfig: Object.assign({}, require('./tsconfig.json'), {
      compilerOptions: {
        allowJs: true,
        module: "commonjs"
      }
    }),

    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false
    },

    files: [
      { pattern: 'test/**/*.spec.ts' }
    ],

    preprocessors: {
      'lib/**/*.ts': ['coverage'],
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
