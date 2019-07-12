let path = require('path');
let webpack = require('webpack');
module.exports = {
  mode:'development',
  entry:{
    react:['react','react-dom']
  },
  target: 'node',
  output:{
    library:'[name]_dll', // var  xxx = 结果
    filename:'[name]_dll.js', // 输出的文件的名字随便起即可
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new webpack.DllPlugin({
      // name需要和library 一样
      name: '[name]_dll',
      path:path.resolve(__dirname,'dist','manifest.json')
    })
  ]
}
