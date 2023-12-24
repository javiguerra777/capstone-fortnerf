import { io } from 'socket.io-client';

const dbUrl = process.env.REACT_APP_BACKEND_URL;
export const socket = io(dbUrl || '');

export default {};
