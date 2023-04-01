import { Server } from "socket.io";
import express, { Router } from "express";
import { createServer } from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import chatHandler from './api/chat';

dotenv.config();

const app = express();

app.use(cors());

const router = express.Router();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT) || 8080;
const options = {
  cors: {
    origin: "*",
  },
}

export const io = new Server(httpServer, options);

io.on("connection", (socket) => chatHandler(socket));

router.get('/', (req, res) => {
  return res.status(200).send({ "nett-hier": 'waren sie schonmal BW?' });
});

app.use(router);

httpServer.listen(PORT, () => {
  console.log('⚡️[server]: Server connected on port: ' + PORT)
});