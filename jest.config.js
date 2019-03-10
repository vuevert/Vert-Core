module.exports = {
  coverageDirectory: '<rootDir>/.coverage-report',
  globalSetup: '<rootDir>/.jest/setup.js',
  moduleNameMapper: {
    'vue$': 'vue/dist/vue.common.js',
    '../lib': '<rootDir>/dist/index.js'
  },
  globals: {
    'ts-jest': {
      babelConfig: require('./babel.config'),
      tsConfig: require('./tsconfig.json')
    }
  }
}
