
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const UglifyJsWebpackPlugin  = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',    // 'production'  会自动 UglifyJsPlugin
    target: 'web', // node
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),   //必须是绝对路径        
        filename: 'bundle.js', // [name] [hash] [chunkhash]
        // publicPath: '' //
    },
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()   // mode production 才生效
        ],
    },
    devtool: 'source-map',
    module: {
        // noParse:/jquery/, // 如果确定没有依赖的可以加载这里
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
            },
            // scss 一定要放在css前
            // {
            //     test: /.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            
            {
                test: /.jpg|png|gif|svg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 6*1024,
                        outputPath: 'img',
                    }
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:"url-loader",
                options:{
                    limit:10000,
                    name:'fonts/[name].[ext]?[hash]'
                }
            },
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        // 开发环境下 可以清空指定目录
        // new CleanWebpackPlugin(['./dist']),
        // new CopyWebpackPlugin([{ // 拷贝静态资源插件
        //   from:'./assets',
        //   to:'./'
        // }]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-title',
            filename: 'index.html',  
            template: './index.html'   //html模板
        }),
        
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        // }),

        // 如果 发现moment中引入了 locale那就忽略掉
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new webpack.DefinePlugin({
        // 定义的变量 需要用json.stringfy包裹
            DEV:JSON.stringify('development'), // console.log("development"),
            EXPRESSION:'1+1',
            FLAG:'true' ,//console.log(true)
        }),
        
    ],
    // externals: {
    //     jquery: '$'   // module.exports    jQuery  $
    // },
    devServer:{
        contentBase: './',  //告诉服务器从哪里提供内容
        host: 'localhost',   
        port: 4000,
        // hot: true,
        proxy: {
            // '/api': 'http://localhost:3000'   // /api/user  ->  http://localhost:3000/api/user
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''}
            }
        },
        // 可以mock 自己的数据
        // before(app){ //  app = express()
        //   app.get('/api/user',(req,res)=>{
        //     res.json({name:'rayyang'});
        //   })
        // }
    }
}
