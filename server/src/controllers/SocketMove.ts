import { Socket } from 'socket.io';
import Room from '../model/Room';
import handleError from '../utils/error';

export default class SocketMoveHandler {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  async move() {
    this.socket.on(
      'move',
      async ({
        x,
        y,
        direction,
        room,
        respawn,
        otherSocketId,
        scene,
      }) => {
        try {
          if (scene === 'home') {
            await Room.updateOne(
              { _id: room, 'users.id': this.socket.id },
              {
                $set: {
                  'users.$.x': x,
                  'users.$.y': y,
                  'users.$.direction': direction,
                },
              },
            );
          }
          this.socket.to(room).emit('playerMove', {
            x,
            y,
            direction,
            socketId: this.socket.id,
            respawn,
            otherSocketId: otherSocketId || '',
          });
        } catch (err) {
          handleError(this.socket, err.message);
        }
      },
    );
  }

  async moveEnd() {
    this.socket.on('moveEnd', async ({ direction, room }) => {
      try {
        this.socket.to(room).emit('playerMoveEnd', {
          direction,
          socketId: this.socket.id,
        });
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async shoot() {
    this.socket.on('shoot', async ({ x, y, direction, room }) => {
      try {
        await this.socket.to(room).emit('bulletShot', {
          x,
          y,
          direction,
          otherId: this.socket.id,
        });
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }
}
