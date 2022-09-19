export type Message = {
  username: string;
  message: string;
  date: number;
};
export type User = {
  user: {
    username: string;
    name: string;
    email: string;
    loggedIn: boolean;
  };
};

export default {};
