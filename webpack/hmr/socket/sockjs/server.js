const app = require('express')();
const server = require('http').createServer(app);
const sockjs = require('sockjs');
let socket = sockjs.createServer({
  // Use provided up-to-date sockjs-client
  // sockjs_url: '/__webpack_dev_server__/sockjs.bundle.js',
});
socket.installHandlers(server, {
  prefix: '/sockjs-node',
});
socket.on('connection', function(conn) {
  conn.write('ok', 222);
});

server.listen(3000, () =>{
  console.log(' 3000 success');
})