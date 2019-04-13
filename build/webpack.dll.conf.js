const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    vendor: [
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'element-ui',
      'axios',
      'dayjs',
      'izitoast',
      'nprogress',
      'sweetalert'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      })
    ]
  },
  plugins: [
    /*
      @desc: https://webpack.js.org/plugins/module-concatenation-plugin/
      "作用域提升(scope hoisting)",使代码体积更小[函数申明会产生大量代码](#webpack3)
    */
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
