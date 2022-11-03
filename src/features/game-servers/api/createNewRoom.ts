import axios from 'axios';
import dbUrl from '../../../common/api-link/DbLink';

type NewRoom = {
  name: string;
  username: string;
};
const createNewRoom = async (data: NewRoom) => {
  const response = await axios.post(`${dbUrl}/createRoom`, data);
  return response;
};

export default createNewRoom;
