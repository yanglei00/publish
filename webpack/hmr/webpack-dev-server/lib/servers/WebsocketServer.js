const ws = require('ws');
module.exports = class WebsocketServer {
  constructor(server) {
    this.server = server
    this.wsServer = new ws.Server({
      noServer: true,
      path: '/sockjs-node',
    });
    this.server.listeningApp.on('upgrade', (req, sock, head) => {
      debugger
      if (!this.wsServer.shouldHandle(req)) {
        return;
      }

      this.wsServer.handleUpgrade(req, sock, head, (connection) => {
        this.wsServer.emit('connection', connection, req);
      });
    });

    this.wsServer.on('error', (err) => {
      this.server.log.error(err.message);
    });
    // const noop = () => {};
    // setInterval(() => {
    //   this.wsServer.clients.forEach((socket) => {
    //     if (socket.isAlive === false) {
    //       return socket.terminate();
    //     }

    //     socket.isAlive = false;
    //     socket.ping(noop);
    //   });
    // }, this.server.heartbeatInterval);
  }

  send(connection, message) {
    // prevent cases where the server is trying to send data while connection is closing
    if (connection.readyState !== 1) {
      return;
    }
    console.log('socket', message);
    connection.send(message);
  }

  close(connection) {
    connection.close();
  }

  // f should be passed the resulting connection and the connection headers
  onConnection(f) {
    this.wsServer.on('connection', (connection, req) => {
      connection.isAlive = true;
      connection.on('pong', () => {
        connection.isAlive = true;
      });
      f(connection, req.headers);
    });
  }

  onConnectionClose(connection, f) {
    connection.on('close', f);
  }
};
