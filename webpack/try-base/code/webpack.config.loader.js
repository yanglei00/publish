const path = require('path')
const merge  = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merge({
    module: {
        rules: [
            {
                test: /.scss$/,
                use: ['style-loader',
                    'css-loader', 
                    path.resolve(__dirname, 'loaders/sass-loader.js')
                ]
            },
            {
                test: /.js$/,
                use: 'a-loader',
                // enforce: 'pre'
            },
            {
                test: /.js$/,
                use: 'b-loader',
            },
            {
                test: /.js$/,
                use: 'c-loader',
                // enforce: 'post'
            },
            {
                test: /.js$/,
                use: 'babel-loader'
            },
        ]
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, 'loaders'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'style-loader': path.resolve(__dirname, 'loaders/style-loader.js'),
            'a-loader': path.resolve(__dirname, 'loaders/a-loader.js'),
            'b-loader': path.resolve(__dirname, 'loaders/b-loader.js'),
            'c-loader': path.resolve(__dirname, 'loaders/c-loader.js'),
            'babel-loader': path.resolve(__dirname, 'loaders/babel-loader.js'),
        }
    }
},base)

