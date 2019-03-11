const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const env = process.env.NODE_ENV;

const basePath = 'static/'
module.exports = {
  context: path.resolve(__dirname, '../'), // 设置项目根目录为上下文（影响entry和loader中的路径）
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${basePath}js/[name].[hash].js`
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
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: `${basePath}images/[name]-[hash:8].[ext]`,
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
          name: `${basePath}fonts/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      minify: env === 'production' ? {
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: false,    //删除空白符与换行符
        minifyCSS: true, // 压缩html中的css代码
        minifyJS: true // 压缩html的js代码
      } : false
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
      threads: 4,
      // 如何处理.js 文件，用法和 Loader 配置中的
      loaders: ['babel-loader?cacheDirectory']
    }),
    new DllReferencePlugin({
      manifest: require('./vendor-manifest.json'),
    })
  ]
};

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

