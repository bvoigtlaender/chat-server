const express = require("express");
const { Server } = require('socket.io');
const { createServer } = require("http");
const { PrismaClient } = require('@prisma/client')
const users = require('./users')

const port = 4000;
const options = {
  cors: {
    origin: "*",
  },
}

const client = new PrismaClient();
const app = express()
const server = createServer(app)
const io = new Server(server, options);

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

app.post('/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    await users.login(email, password);
  } catch (error) {
    res.status(500).json(error)
  }
})

app.put('/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    await users.register(email, password)
  } catch (error) {
    res.status(500).json(error)
  }
})

server.listen(port)