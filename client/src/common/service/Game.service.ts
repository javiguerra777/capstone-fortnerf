import axios from 'axios';
import { baseUrl } from '../../environment/BaseUrl';

type GameData = {
  id: string;
  user: {
    username: string;
    score: number;
  };
};
type NewRoom = {
  name: string;
  username: string;
};
export const postScore = async (gameData: GameData) => {
  const response = await axios.put(
    `${baseUrl}/room/${gameData.id}`,
    gameData.user,
  );
  return response;
};
export const createNewRoom = async (data: NewRoom) => {
  const response = await axios.post(`${baseUrl}/createRoom`, data);
  return response;
};

export const getRoomData = async (id: string) => {
  const response = await axios.get(`${baseUrl}/room/${id}`);
  return response;
};
export const getAllRooms = async () => {
  const response = await axios.get(`${baseUrl}/rooms`);
  return response;
};
export default {};
