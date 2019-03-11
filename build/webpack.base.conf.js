const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  context: path.resolve(__dirname, '../'), // 设置项目根目录为上下文（影响entry和loader中的路径）
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  resolveLoader: {
    modules: [resolve('node_modules')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
      'router': resolve('src/router'),
      'store': resolve('src/store'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css']
      },
      {
        test: /\.less$/,
        use: ['happypack/loader?id=less']
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    // 静态目录处理
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: resolve('dist/static'),
      ignore: ['.*']
    }]),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'babel',
      // 如何处理.js 文件，用法和 Loader 配置中的
      loaders: ['babel-loader?cacheDirectory']
    }),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'css',
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'less',
      loaders: ['vue-style-loader', 'css-loader', 'less-loader']
    }),
  ]
};

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

