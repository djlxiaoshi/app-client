const path = require('path');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = WebpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下： 所有的都能访问 通过ip或者通过localhost
    compress: true, // 启用gzip压缩一切服务
    port: 8080,
    hot: true, // 启动热更新模块 或者在命令行中带参数开启
    overlay: { // 在编译的时候出现任何错误 就会在网页上面显示黑色的背景和错误的信息
      warnings: false, // 警告信息一般不开启
      errors: true // 错误信息
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css']
      },
      {
        test: /\.less$/,
        use: ['happypack/loader?id=less']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    })
  ]
});

