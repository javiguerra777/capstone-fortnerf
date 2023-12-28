import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import path from 'path';
import routes from './routes/routes';
import SocketRoomHandler from './controllers/SocketRoom';
import SocketGameHandler from './controllers/SocketGame';
import SocketMoveHandler from './controllers/SocketMove';

declare module 'express-serve-static-core' {
  interface Request {
    io: Server;
  }
}
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (result.error) {
  throw result.error ;
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
const server = http.createServer(app);
// using middleware
app.use(cors());
app.use(express.json());
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const port = process.env.PORT || 5000;
console.log(process.env.DB_KEY);
// connecting database
mongoose.connect(process.env.DB_KEY || '');
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});
// socket.io middleware
app.use(( req, res, next ) => {
  req.io = io;
  next();
});
// api routes
app.use(routes);
// socket.io functionality and handling rooms
io.on('connection', (socket) => {
  socket.emit('myId', socket.id);
  socket.on('joinMyRoom', (userId) => {
    socket.join(userId);
  })
  // socket game controllers
  const socketRoom = new SocketRoomHandler(socket);
  const socketGame = new SocketGameHandler(socket);
  const socketMove = new SocketMoveHandler(socket);
  // handle the room being updated
  socketRoom.joinRoom(io);
  socketRoom.updateRooms(io);
  socketRoom.leaveRoom(io);
  socketRoom.disconnecting(io);
  // game methods
  socketGame.joinHome();
  socketGame.startGame(io);
  // user communication
  socketRoom.sendMessage(io);
  // game movements
  socketMove.move();
  socketMove.moveEnd();
  socketMove.shoot();
  // handing end game scene
  socketGame.endGame();
  socketGame.gameOver(io);
});

server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
