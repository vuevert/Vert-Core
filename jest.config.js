module.exports = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/.jest/setup.ts'
  ]
}
