import { io } from '../server';

export default function chatHandler(socket: any) {
  socket.send('Junioriges Code');

  socket.on('/', (...args: any[]) => {
    console.log('from bjarne');
    socket.send('Junioriges Code');
  });
}