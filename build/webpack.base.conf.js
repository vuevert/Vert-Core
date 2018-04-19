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
    'index': resolve('./src/index.ts'),
  },

  output: {
    path: resolve('./lib'),
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

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'Vue'
    },

    'vue-router': {
      commonjs: 'vue-router',
      commonjs2: 'vue-router',
      root: 'VueRouter'
    },

    vuex: {
      commonjs: 'vuex',
      commonjs2: 'vuex',
      root: 'Vuex'
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
    })
  ]
}

function resolve (filePath) {
  return path.resolve(__dirname, '../' + filePath)
}
