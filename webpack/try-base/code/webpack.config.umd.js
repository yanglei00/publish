
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals');
const path = require('path')
module.exports = {
    mode: 'development',    // 'production'  会自动 UglifyJsPlugin
    // target: 'web', // node
    entry: './src/umd.js',
    output: {
        path: path.resolve(__dirname, 'dist'),   //必须是绝对路径        
        filename: 'bundle.js', // [name] [hash] [chunkhash]
        // publicPath: '' //
        library: 'table',
        libraryTarget: 'umd'
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
                // exclude:/node_modules/,
                // include:path.resolve(__dirname,'src'),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',  
            template: './index.html'   //html模板
        }),
        
    ],
    externals: [{
    'vue': {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    nodeExternals({
        whitelist: ['vue'],
        importType: function(moduleName) {
            return 'umd ' + moduleName;
        }
    })
    ],
    // externals: {
    //     // jquery: '$'   // module.exports    jQuery  $
    // },
    // devServer:{
    //     contentBase: './',  //告诉服务器从哪里提供内容
    //     host: 'localhost',   
    //     port: 4000,
    // }
}
