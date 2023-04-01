import { Server } from "socket.io";
import express, { Router } from "express";

const app = express();
const router = express.Router();

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

const PORT = process.env.PORT;
const options = {
  cors: {
    origin: "*",
  },
}

const io = new Server(Number(PORT), options);

io.on('connection', socket => {
});

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});