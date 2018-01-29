const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    index: path.resolve(__dirname, './demo/app.index/index.ts')
  },

  devServer: {
    host: '0.0.0.0',
    compress: true,
    port: 8080
  },

  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],

    alias: {
      'vue$': 'vue/dist/vue.common.js'
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
      template: path.resolve(__dirname, './demo/app.index/index.html')
    })
  ]
}
