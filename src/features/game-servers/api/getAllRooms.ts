import axios from 'axios';
import dbUrl from '../../../common/api-link/DbLink';

const getAllRooms = async () => {
  const response = await axios.get(`${dbUrl}/rooms`);
  return response;
};

export default getAllRooms;
