import { Socket } from 'socket.io';

const handleError = (socket: Socket, err): void => {
  socket.emit('server_err', err.message);
};

export default handleError;
