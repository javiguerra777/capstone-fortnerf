import { Socket, Server } from 'socket.io';
import Room from '../model/Room';
import handleError from '../utils/error';

export default class SocketGameHandler {
  socket: Socket;

  constructor(socket) {
    this.socket = socket;
  }

  async startGame(io: Server) {
    this.socket.on('start_game', async (room) => {
      try {
        await Room.updateOne({ _id: room }, { started: true });
        const rooms = Room.find();
        await this.socket.to(room).emit('play_game');
        io.emit('updatedRooms', rooms);
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async joinHome() {
    this.socket.on('join_home', async (data) => {
      try {
        await this.socket.to(data.room).emit('new_player', {
          username: data.username,
          socketId: this.socket.id,
          sprite: data.sprite,
        });
        const usersInRoom = await Room.findById(data.room);
        const otherUsers = usersInRoom?.users.filter(
          (theUser) => theUser.id !== this.socket.id,
        );
        if (otherUsers && otherUsers.length > 0) {
          await this.socket.emit('existingPlayers', otherUsers);
        }
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async gameOver(io: Server) {
    this.socket.on('GameOver', async (room) => {
      try {
        await Room.deleteOne({ _id: room });
        io.in(room).emit('lobby');
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async endGame() {
    this.socket.on('winner', async ({ username, room }) => {
      try {
        this.socket.to(room).emit('game_over', username);
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }
}
