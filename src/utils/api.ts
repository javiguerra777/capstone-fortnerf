import axios from 'axios';

const dbUrl = 'https://capstone-backend-production.up.railway.app';
type NewRoom = {
  name: string;
  username: string;
};
// api endpoints
const createNewRoom = async (data: NewRoom) => {
  const response = await axios.post(`${dbUrl}/createRoom`, data);
  return response;
};
export const getRoomData = async (id: string) => {
  const response = await axios.get(`${dbUrl}/room/${id}`);
  return response;
};
export const getAllRooms = async () => {
  const response = await axios.get(`${dbUrl}/rooms`);
  return response;
};

export default createNewRoom;
