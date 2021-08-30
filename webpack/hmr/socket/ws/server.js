const app = require('express')();
const server = require('http').createServer(app);
const ws = require('ws');
let socket = new ws.Server({
  noServer: true,
  path: '/sockjs-node',
});

server.on('upgrade', (req, sock, head) => {
  socket.handleUpgrade(req, sock, head, (connection) => {
    connection.send('ok', 222);  
    setTimeout(() => {
      connection.send('setTimeout');  
    }, 1000)
  });
});

server.listen(3000, () =>{
  console.log(' 3000 success');
})
