#! /usr/bin/env node

let path = require('path');
// 1) 拿到执行命令时目录下的配置文件  不能拼接 __dirname
let config = require(path.resolve('webpack.config.js'));
// 2） 编译
let Compiler = require('../lib/compiler.js');
let compiler = new Compiler(config);
compiler.hooks.entryOption.call();
compiler.run();