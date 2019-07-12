## webpack基本配置

### 概念
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

###四个核心概念
- 入口(entry)  
- 出口(output) 术语emit生成
- loader  
让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，
- plugin 
  loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

### 需要安装的npm包
webpack webpack-cli  
webpack-cli 全局:命令行中提供了webpack命令
            本地: 可以在package.json 的scripts中使用 
思考：如果同时安装，是怎么的一个查找顺序？

### module
js模块   @babel/core babel-loader @babel/preset-env 
css模块  style-loader  将css输出到html到style标签中
         css-loader   js中引入css文件
less模块  less less-loader   
scss模块  node-sass(淘宝镜像安装)  less-loader     注意 scss 要在css配置之前 loader执行是有顺序的
css预处理  postcss-loader   require('autoprefixer')
png|jpg|gif处理   url-loader里用到file-loader

html模块
html-withimg-loader   处理HTML片段中的图片
 
#### plugins  
注意执行顺序
optimize-css-assets-webpack-plugin 
mini-css-extract-plugin   要先于html-webpack-plugin
html-webpack-plugin


### devServer
webpack-dev-server
contentBase host port 
proxy     http-proxy-middleware 
hot: ture    new webpack.HotModuleReplacementPlugin()   new webpack.NamedModulesPlugin()
--hot
before(app) mock
### optimization

uglifyjs-webpack-plugin   optimize-css-assets-webpack-plugin  mini-css-extract-plugin

noParse://
ignorePlugin
exclude include
happypack
dllPlugin  DllReferencePlugin
tree-shaking require他不会去分析依赖 尽量用import
splitChunks 抽取公共代码  多页面

### 热更新
devServer   hot
new webpack.HotModuleReplacementPlugin()
new webpack.NamedModulesPlugin()
### 懒加载
import().then((module)=> {
    module.default 是需要的内容
}) 
动态导入(dynamic imports)
当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure
动态地加载模块。调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。
### target
node web

### resolve 模块解析
modules alias extensions  
mainFields 此选项将决定在 package.json 中使用哪个字段导入模块  
mainFiles 入口文件

### devtool
source-map

### 引入jquery的三种方法
import $ from 'expose-loader?$!jquery'
providePlugin 
externals

### loader编写
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件
loader 的几种加载方式
1.第三方模块导入   2.绝对路径  3. resolveLoader  modules  alias
loader分类   pre + normal + inline + post     同步和异步  let cb = this.async()
inline-loader    require('!!inline-loader.js!./a.js')    !!表示排除所有其它的loader
执行顺序   自上向下  从左到右   
loader结构 pitch部分 normal部分        如果pitch有返回值就跳过剩下的loader合自己执行上一次loader
sass-loader 
style-loader 

### plugin编写
插件是 webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 webpack 的编译过程(compilation process)。插件能够 钩入(hook) 到在每个编译(compilation)中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。

tapable 这个小型 library 是 webpack 的一个核心工具，但也可用于其他地方，以提供类似的插件接口。webpack 中许多对象扩展自 Tapable 类。这个类暴露 tap, tapAsync 和 tapPromise 方法，可以使用这些方法，注入自定义的构建步骤，这些步骤将在整个编译过程中不同时机触发。

html-webpack-plugin  mini-css-extract-plugin optimize-css-assets-webpack-plugin  uglifyjs-webpack-plugin
clean-webpack-plugin  copy-webpack-plugin


### vue-cli
vue-loader vue-template-compiler 
vue-style-loader   
支持jsx语法   @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props



### react-cli



### 参考文献
webpack中文文档： https://www.webpackjs.com/concepts/
深入浅出Webpack： http://webpack.wuhaolin.cn/