const baseConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    })
  ]
});
