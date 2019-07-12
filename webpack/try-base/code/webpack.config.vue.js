let path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWbpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge({}, {
    entry: './src/index.vue.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@vue/babel-preset-jsx'
                        ]
                    }
                }
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            }
        ]
    },
    resolve: {
        //引入路径是不用写对应的后缀名
        extensions: ['.js', '.vue', '.json'],
        //缩写扩展
        alias: {
            //运行时 + 编译的版本
            'vue$':'vue/dist/vue.esm.js',
            //用@直接指引到src目录下
            '@': path.resolve(__dirname, './src'),
        }
    },
    plugins: [
        new HtmlWbpackPlugin({
            template: './index.html'
        }),
        new VueLoaderPlugin()
    ]
})