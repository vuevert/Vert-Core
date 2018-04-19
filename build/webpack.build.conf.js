const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')
const minifyConfig = merge(baseConfig, {
  output: {
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
})

webpack([baseConfig, minifyConfig], function (err, stats) {
  if (err || stats.hasErrors()) {
    console.error(err)
    return
  }

  console.log(stats)
})
