const http = require('http');
const express = require('express');
const webpackDevMiddleware = require('../../webpack-dev-middleware');
const SocketServerImplementation = require('./servers/WebsocketServer')
const updateCompiler = require('./utils/updateCompiler')
class Server {
  constructor(compiler, options = {}) {
    this.compiler = compiler;
    this.options = options;
    this.sockets = [];
    this.hot = this.options.hot || this.options.hotOnly;
    this.publicHost = this.options.public;
    this.watchOptions = options.watchOptions || {};
    // 修改entry和plugins
    updateCompiler(compiler, options)
    // 监听compiler.hooks.done事件
    this.setupHooks();
    // 初始化express
    this.setupApp();
    // 以监听模式启动webpack编译、设置文件系统、将dist目录作为静态资源访问目录
    this.setupDevMiddleware();
    // 例如将contentBase设置为静态资源访问目录
    this.setupMiddleware()
    // 初始化http服务
    this.createServer();
  }
  setupApp() {
    this.app = new express();
  }
  setupHooks() {
    const addHooks = (compiler) => {
      const { done } = compiler.hooks;
      done.tap('webpack-dev-server', (stats) => {
        console.log('compiler watch done', stats.hash);
        this._sendStats(this.sockets, this.getStats(stats));
        this._stats = stats;
      });
    };
    addHooks(this.compiler);
  }
  setupDevMiddleware() {
    this.middleware = webpackDevMiddleware(
      this.compiler,
      Object.assign({}, this.options)
    );
  }
  setupMiddleware() {
    if(this.options.contentBase) {
      this.app.use(express.static(this.options.contentBase))
    }
    this.app.use(this.middleware);
  }
  createServer() {
    this.listeningApp = http.createServer(this.app);
    this.listeningApp.on('error', (err) => {
      console.log('error');
    });
  }
  createSocketServer() {
    this.socketServer = new SocketServerImplementation(this);
    this.socketServer.onConnection((connection, headers) => {
      this.sockets.push(connection);
      this.socketServer.onConnectionClose(connection, () => {
        const idx = this.sockets.indexOf(connection);
        if (idx >= 0) {
          this.sockets.splice(idx, 1);
        }
      });
      if (this.hot) {
        this.sockWrite([connection], 'hot');
      }
      if (!this._stats) {
        return;
      }
      this._sendStats([connection], this.getStats(this._stats));
    });
  }
  listen(port, hostname, fn) {
    this.hostname = hostname;
    return this.listeningApp.listen(port, hostname, (err) => {
      this.createSocketServer();
      fn()
    });
  }
  close(cb) {
    this.sockets.forEach((socket) => {
      this.socketServer.close(socket);
    });
    this.sockets = [];
  }
  use() {
    this.app.use.apply(this.app, arguments);
  }
  sockWrite(sockets, type, data) {
    sockets.forEach((socket) => {
      this.socketServer.send(socket, JSON.stringify({ type, data }));
    });
  }
  _sendStats(sockets, stats) {
    this.sockWrite(sockets, 'hash', stats.hash);
    this.sockWrite(sockets, 'ok');
  }
  getStats(stats) {
    return {
      hash: stats.hash
    }
  }
}


module.exports = Server;
