var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge.smart(baseConfig, {
  devServer: {
    contentBase: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
});