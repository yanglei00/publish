
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',    // 'production'  会自动 UglifyJsPlugin
    // target: 'web', // node
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),   //必须是绝对路径        
        filename: 'bundle.js', // [name] [hash] [chunkhash]
        // publicPath: '' //
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {   
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-title',
            filename: 'index.html',  
            template: './index.html'   //html模板
        })
        
    ],
    devServer:{
        contentBase: './',  //告诉服务器从哪里提供内容
        host: 'localhost',   
        port: 4000,
    }
}
