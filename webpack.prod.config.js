var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var webpack = require('webpack')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge.smart(baseConfig, {
  plugins: [
      // new UglifyJSPlugin(),
      new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
      new HtmlWebpackPlugin({
        filename: 'dist/index.html',
        template: 'src/index.html'
      })
  ]
});