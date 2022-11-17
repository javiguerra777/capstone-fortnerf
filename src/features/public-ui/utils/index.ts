import axios from 'axios';

type Request = {
  name?: string;
  email: string;
  message: string;
};
const sendContact = async ({
  name = '',
  email,
  message,
}: Request) => {
  const data = axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/sendEmail`,
    {
      name,
      email,
      message,
    },
  );
  return data;
};
export default sendContact;
