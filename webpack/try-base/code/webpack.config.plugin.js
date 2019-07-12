const merge  = require('webpack-merge')
const base = require('./webpack.config.base')

class P1 {
    apply(compiler){
        compiler.hooks.done.tap('p1', function(){
            console.log('webpack done')
        })
    }
}
class AsyncPlugin {
    apply(compiler){
      compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation,cb)=>{
        // console.log(compilation.assets) // moduleId : source
        setTimeout(() => {
          console.log('emit one')
          cb();
        }, 2000);
      });
      compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation)=>{
        return new Promise((resolve,reject)=>{
          setTimeout(() => {
            console.log('emit two')
            resolve();
          }, 2000);
        })
      })
    }
}
module.exports = merge({
    plugins: [
        new P1(),
        new AsyncPlugin()
    ]
},base)