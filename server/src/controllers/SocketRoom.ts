import { Socket, Server } from 'socket.io';
import Room from '../model/Room';
import handleError from '../utils/error';
import { leaveRoom as leave, joinRoom as join } from '../utils/user';
import { User } from '../modules/user';
import {
  startingCoords,
  secondaryCoords,
  thirdCoords,
  fourthCoords,
  fifthCoords,
  sixthCoords,
} from '../utils/constants';

export default class SocketRoomHandler {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  async joinRoom(io: Server) {
    this.socket.on(
      'join_room',
      async ({ room, username, sprite }) => {
        try {
          await join(this.socket.id, username, room);
          let userCoords;
          const theRoom = await Room.findById(room);
          if (theRoom?.users.length === 0) {
            userCoords = startingCoords;
          }
          theRoom?.users.forEach((theUser) => {
            if (
              theUser.startingCoords &&
              theUser.startingCoords.x === startingCoords.x &&
              theUser.startingCoords.y === startingCoords.y
            ) {
              userCoords = secondaryCoords;
            } else if (
              theUser.startingCoords &&
              theUser.startingCoords.x === secondaryCoords.x &&
              theUser.startingCoords.y === secondaryCoords.y
            ) {
              userCoords = thirdCoords;
            } else if (
              theUser.startingCoords &&
              theUser.startingCoords.x === thirdCoords.x &&
              theUser.startingCoords.y === thirdCoords.y
            ) {
              userCoords = fourthCoords;
            } else if (
              theUser.startingCoords &&
              theUser.startingCoords.x === fourthCoords.x &&
              theUser.startingCoords.y === fourthCoords.y
            ) {
              userCoords = fifthCoords;
            } else if (
              theUser.startingCoords &&
              theUser.startingCoords.x === fifthCoords.x &&
              theUser.startingCoords.y === fifthCoords.y
            ) {
              userCoords = sixthCoords;
            } else {
              userCoords = startingCoords;
            }
          });
          await Room.updateOne(
            { _id: room },
            {
              $push: {
                users: {
                  id: this.socket.id,
                  username,
                  direction: 'down',
                  x: 500,
                  y: 500,
                  sprite,
                  startingCoords: {
                    x: userCoords.x,
                    y: userCoords.y,
                  },
                },
              },
            },
          );
          const rooms = await Room.find();
          const updatedRoom = await Room.findById(room);
          await this.socket.emit('update_coords', userCoords);
          await this.socket.join(room);
          io.in(room).emit('updatedRoom', updatedRoom);
          io.emit('updatedRooms', rooms);
        } catch (err) {
          handleError(this.socket, err.message);
        }
      },
    );
  }

  async updateRooms(io: Server) {
    this.socket.on('updateRooms', async () => {
      try {
        console.log('updating rooms');
        const data = await Room.find();
        io.emit('updatedRooms', data);
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async sendMessage(io: Server) {
    this.socket.on(
      'chat',
      async ({ username, message, date, room, sprite }) => {
        try {
          io.in(room).emit('chat_msg', {
            username,
            message,
            date,
            sprite,
          });
        } catch (err) {
          handleError(this.socket, err.message);
        }
      },
    );
  }

  async returnToLobby(io: Server) {
    this.socket.on('return_to_lobby', async ({ room }) => {
      try {
        io.in(room).emit('lobby');
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async leaveRoom(io: Server) {
    this.socket.on('leave_room', async (data) => {
      try {
        console.log('user left');
        await leave(this.socket.id);
        await Room.updateOne(
          { _id: data.id },
          {
            $pull: {
              users: { id: this.socket.id },
            },
          },
        );
        const theRoom = await Room.findById(data.id);
        await this.socket.leave(data.id);
        this.socket.to(data.id).emit('playerLeft', this.socket.id);
        if (theRoom?.users.length === 0) {
          await Room.updateOne({ _id: data.id }, { started: false });
        }
        io.in(data.id).emit('updatedRoom', theRoom);
        const rooms = await Room.find();
        io.emit('updatedRooms', rooms);
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }

  async disconnecting(io: Server) {
    this.socket.on('disconnecting', async () => {
      try {
        const pUser: User | any = await leave(this.socket.id);
        await Room.updateOne(
          { _id: pUser.room },
          {
            $pull: {
              users: { id: this.socket.id },
            },
          },
        );
        if (pUser) {
          await this.socket.leave(pUser.room);
        }
        const theRoom = await Room.findById(pUser.room);
        const rooms = await Room.find();
        this.socket.to(pUser.room).emit('playerLeft', this.socket.id);
        io.in(pUser.room).emit('updatedRoom', theRoom);
        io.emit('updatedRooms', rooms);
      } catch (err) {
        handleError(this.socket, err.message);
      }
    });
  }
}
