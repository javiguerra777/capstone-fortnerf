import { io } from 'socket.io-client';

export const socket = io(
  'https://capstone-backend-production.up.railway.app/',
);

export default {};
