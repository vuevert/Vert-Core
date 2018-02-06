const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    "presets": [
      ["env", {
        "modules": false,
        "useBuiltIns": "entry",
        "targets": {
          "browsers": ["ie >= 9", "chrome >= 30", "firefox >= 30"]
        }
      }]
    ],
    "plugins": [
      "transform-runtime"
    ]
  }
}

module.exports = {
  entry: {
    'multi-apps-in-spa': resolve('./demo/app.multi-apps-in-spa'),
    'tour-of-hero': resolve('./demo/app.tour-of-hero/index.ts'),
    'welcome': resolve('./demo/app.welcome/index.ts')
  },

  output: {
    path: '/',
    filename: '[name].js'
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
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: [
              babelLoader,
              'ts-loader'
            ]
          }
        }
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
      filename: 'welcome.html',
      template: resolve('./demo/app.welcome/index.html'),
      chunks: ['welcome']
    }),

    new HtmlWebpackPlugin({
      filename: 'tour-of-hero.html',
      template: resolve('./demo/app.tour-of-hero/index.html'),
      chunks: ['tour-of-hero']
    }),

    new HtmlWebpackPlugin({
      filename: 'multi-apps-in-spa.html',
      template: resolve('./demo/app.multi-apps-in-spa/index.html'),
      chunks: ['multi-apps-in-spa']
    }),

    new FriendlyErrorPlugin()
  ]
}

function resolve (filePath) {
  return path.resolve(__dirname, '../', filePath)
}
