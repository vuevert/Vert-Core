const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const { TSDeclerationsPlugin } = require('ts-loader-decleration')

const baseConfig = require('./webpack.base.conf')
const minifyConfig = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin([
      path.resolve(__dirname, '../lib')
    ], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),

    // new TSDeclerationsPlugin({
    //   main: 'index',
    //   out: './index.d.ts'
    // }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
})

webpack(minifyConfig, function (err, stats) {
  if (err) {
    console.error('[Error]', err)
    return
  }

  console.log(stats.toString({
    chunks: false,
    colors: true
  }))
})
