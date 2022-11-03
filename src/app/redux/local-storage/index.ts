type UserPayload = {
  username: string;
  email: string;
  name: string;
  sprite: string;
  id: string;
  loggedIn: boolean;
};

export const updateLocalStorage = async (payload: UserPayload) => {
  await localStorage.setItem('username', payload.username);
  await localStorage.setItem('email', payload.email);
  await localStorage.setItem('name', payload.name);
  await localStorage.setItem('sprite', payload.sprite);
  await localStorage.setItem('id', payload.id);
  await localStorage.setItem('loggedIn', 'true');
};
export const deleteLocalStorage = async () => {
  await localStorage.removeItem('username');
  await localStorage.removeItem('email');
  await localStorage.removeItem('name');
  await localStorage.removeItem('sprite');
  await localStorage.removeItem('id');
  await localStorage.removeItem('loggedIn');
};
export default updateLocalStorage;
