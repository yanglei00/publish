const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 在生成文件之前清空 output 目录
    hotUpdateGlobal: 'webpackHotUpdate' // self["webpackHotUpdate"]() 
  },
  devServer: {
    port: 9000,
    host: '127.0.0.1',
    // 除了dist目录外的静态资源目录
    contentBase: path.resolve(__dirname, 'static'),
    hot: true,
    writeToDisk: true  // 在磁盘输出dist目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './public/index.html'
    }),
    // 定义了devServer.hot:true后，可以省略不写
    // new webpack.HotModuleReplacementPlugin()
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader'],
  //     },
  //   ],
  // },
};
