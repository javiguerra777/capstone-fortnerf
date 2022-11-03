import axios from 'axios';
import dbUrl from '../../../common/api-link/DbLink';

const getRoomData = async (id: string) => {
  const response = await axios.get(`${dbUrl}/room/${id}`);
  return response;
};

export default getRoomData;
