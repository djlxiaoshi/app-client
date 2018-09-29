const webpack = require('webpack');
const path = require('path');

const vendors = [
  'vue', 'izitoast', 'axios', 'moment', 'nprogress', 'vue-router'
];

module.exports = {
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    "lib": vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]',
      context: __dirname,
    })
  ],
};
