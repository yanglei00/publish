let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: 'Happypack/loader?id=css'
            },
            {
                test: /\.js/,
                use: 'Happypack/loader?id=js'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new Happypack({
            id: 'css',
            use: ['style-loader','css-loader']
        }),
        new Happypack({
            id: 'js',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }],
            
        }),
    ],
}

