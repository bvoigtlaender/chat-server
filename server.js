const { Server } = require('socket.io');

const does = [
  'schwimt',
  'fickt',
  'isst',
  'guckt star trek',
  'fliegt wie superman...',
  'was willst du?',
  'willst dich prügeln?...',
  'geh nach hause',
  'schlaf gut!',
  'Ich liebe dich<3',
  'Mein Brot schimmelt',
  'Kannst du meinen bruder tö...',
  `Meiner ist ${Math.random()}cm lang`,
  'Koks macht deine probleme...',
  'Lets make meth',
  'Die drei besten coder der...',
]

const port = 3003;
const options = {
  cors: {
    origin: "*",
  },
}
const io = new Server(port, options);

io.on('connection', socket => {
  console.log(`new connection: ${socket.id}`)
  socket.broadcast.emit('chat-message', { content: `${socket.id} joined this room`, id: -1 })

  io.allSockets().then(sockets => {
    io.emit('chat-rooms', [...sockets])
  })
  socket.on('send-chat-message', ({ message, recipient }) => {
    socket.to(recipient).emit('chat-message', { content: message, id: socket.id });
  })
  socket.on('disconnect', reason => {
    console.log(`${socket.id} disconnected reason ${reason}`)
    io.allSockets().then(sockets => {
      console.log([...sockets])
      io.emit('chat-rooms', [...sockets])
    })
  })
  socket.on('join-room', room => {
  })
});