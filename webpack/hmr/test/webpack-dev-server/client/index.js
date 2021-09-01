var socket = require('./socket');
var reloadApp = require('./utils/reloadApp');

var status = {
  currentHash: '',
};
var options = {
  hot: false,
  initial: true,
};
var socketUrl = 'ws://127.0.0.1:9001/sockjs-node';

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    console.info('[WDS] Hot Module Replacement enabled.');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  ok: function ok() {
    if (options.initial) {
      return options.initial = false;
    }
    // 触发 hotEmitter.emit('webpackHotUpdate', currentHash);
    reloadApp(options, status);
  },
};
// 客户端建立socket连接
socket(socketUrl, onSocketMessage);