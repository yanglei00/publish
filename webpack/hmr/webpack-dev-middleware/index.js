const fs = require('fs');
const path = require('path');
const mime = require('mime')
const config =  require('../webpack.config')
module.exports = function wdm(compiler, opts) {
  const options = Object.assign({}, opts);
  // start watching 以监听模式启动webpack编译
  compiler.watch(options.watchOptions || {}, (err) => {
      console.log('编译成功');
  });
  // 设置文件系统为内存文件系统
  // const MemoryFileSystem = require('memory-fs')
  // compiler.outputFileSystem = new MemoryFileSystem()

  return function (req, res, next) {
    let filename = path.join(config.output.path, req.url.slice(1))
    if(filename.indexOf('favicon.ico') > -1) {
      return next()
    }
    if(fs.statSync(filename).isFile()) {
      let content = fs.readFileSync(filename)
      res.header('Content-Type', mime.getType(filename))
      res.send(content)
    }else {
      next()
    }
  }
};
