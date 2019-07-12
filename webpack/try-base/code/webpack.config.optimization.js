const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge(base,{
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        filename: '[name].js'     
    },
    optimization: {
        splitChunks: { // 分离代码块
            cacheGroups: { // 缓存组
                common: { // common~a~b
                    chunks: 'initial',
                    minSize: 0, // 只要共用的部分超过0个字节 我就把他抽离出来
                    minChunks: 2 // 至少两次才抽离出来
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    }
})