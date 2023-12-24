import { io } from 'socket.io-client';
import { baseUrl } from '../../environment/BaseUrl';

export const socket = io(baseUrl);

export default {};
