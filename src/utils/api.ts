import axios from 'axios';

const dbUrl = process.env.REACT_APP_BACKEND_URL;
type NewRoom = {
  name: string;
  username: string;
};
type GameData = {
  id: string;
  user: {
    username: string;
    score: number;
  };
};
// api endpoints
const createNewRoom = async (data: NewRoom) => {
  const response = await axios.post(`${dbUrl}/createRoom`, data);
  return response;
};
export const postScore = async (gameData: GameData) => {
  const response = await axios.put(
    `${dbUrl}/room/${gameData.id}`,
    gameData.user,
  );
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
