var loaders = require('./config/loaders.js');
var rules = require('./config/rules.js');

module.exports = {
  entry: "./src/js/entry.js",
  output: {
      path: __dirname,
      filename: './dist/js/bundle.js'
  },
  module: {
    rules: rules,
    loaders: loaders
  }
}