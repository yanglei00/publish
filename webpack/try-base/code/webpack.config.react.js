
let path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge(base,{
    entry: './src/index.react.js',
    module: {
        rules: [
            {
                test: /.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新替换
        new webpack.NamedModulesPlugin(),   //通知哪个模块更新
        // dll
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname,'dist','manifest.json')
        }),

    ]
})