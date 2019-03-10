module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      },
    }],
    '@babel/preset-typescript'
  ],

  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import',

    // Deal with decorators.
    ['@babel/plugin-proposal-decorators', {
      decoratorsBeforeExport: true
    }],

    // Deal with TypeScript-Like Class grammar.
    ['@babel/plugin-proposal-class-properties', {
    }],
  ]
}
