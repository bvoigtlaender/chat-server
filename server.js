const { Server } = require('socket.io');
const users = require('./users')

const port = 4000;
const options = {
  cors: {
    origin: "*",
  },
}
const io = new Server(port, options);

io.on('connection', socket => {
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', { text: message, id: socket.id });
  })
});

io.on('connection', socket => {
  let fetchedUsers = users.generateUsers();
  socket.emit('fetch-users', fetchedUsers);
});