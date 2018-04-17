const path = require('path')
const webpack = require('webpack')

const babelConfig = {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 3 versions", "> 2%", "ie >= 9", "Firefox >= 30", "Chrome >= 30"]
      },
      "modules": false,
      "loose": true
    }],
    "stage-2"
  ],
  "plugins": [
    "transform-runtime"
  ]
}

module.exports = {
  entry: {
    'app-component': resolve('./src/app-component/index.ts'),
    'core': resolve('./src/core/index.ts'),
    'data': resolve('./src/data/index.ts'),
    'injection': resolve('./src/injection/index.ts'),
    'event-bus': resolve('./src/event-bus/index.ts'),
    'service': resolve('./src/service/index.ts')
  },

  output: {
    path: resolve('./'),
    filename: '[name].js',
    chunkFilename: '[name].[id].[chunkhash].js',
    library: 'vert',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@vert/core': resolve('./src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelConfig,
        exclude: /node_modules/
      }, {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'process.env.NODE_ENV'
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
}

function resolve (filePath) {
  return path.resolve(__dirname, '../' + filePath)
}
