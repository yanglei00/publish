//  sockjs-node ws customSocket
var socket = function initSocket(url, handlers) {
  // 客户端创建websocket链接
  var client = new WebSocket(url);
  client.onmessage = function (e) {
    var msg = JSON.parse(e.data);
    console.log('dev-server-client', msg);
    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  };
};

module.exports = socket;