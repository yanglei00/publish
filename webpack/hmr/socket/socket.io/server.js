const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: true
});
io.on('connection', (socket) => { 
  socket.emit('ok', 111)
 });
server.listen(3000, () =>{
  console.log(' 3000 success');
})