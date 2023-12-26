import axios from 'axios';
import { baseUrl } from '../../environment/BaseUrl';

type RegisterUser = {
  username: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
};
type LoginUser = {
  email: string;
  password: string;
};
export const registerUser = async (user: RegisterUser) => {
  const { data } = await axios.post(`${baseUrl}/api/register`, user);
  return data;
};
export const loginUser = async (payload: LoginUser) => {
  const { data } = await axios.post(`${baseUrl}/api/login`, payload);
  return data;
};
export default {};
