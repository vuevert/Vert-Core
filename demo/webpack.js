const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    "presets": [
      ["env", { "modules": false }]
    ],
    "plugins": [
      "transform-runtime"
    ]
  }
}

module.exports = {
  entry: {
    index: resolve('./demo/app.index/index.ts')
  },

  devtool: "eval-source-map",

  devServer: {
    host: '0.0.0.0',
    compress: true,
    port: 8080,
    contentBase: resolve('./demo/static'),
    quiet: true
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],

    alias: {
      'vue-enterprise': resolve('./src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [
          babelLoader
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          babelLoader,
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./demo/app.index/index.html')
    }),

    new FriendlyErrorPlugin()
  ]
}

function resolve (filePath) {
  return path.resolve(__dirname, '../', filePath)
}
