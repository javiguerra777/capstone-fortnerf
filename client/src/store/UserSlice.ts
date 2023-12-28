import { createSlice } from '@reduxjs/toolkit';
import { socket } from '../common/service/socket';

type User = {
  id: string;
  token: string;
  username: string;
  name: string;
  email: string;
  profilePicture: string;
  host: boolean;
  loggedIn: boolean;
  x: number;
  y: number;
};

const initialState = {
  id: '',
  token: '',
  username: '',
  name: '',
  email: '',
  profilePicture:
    'https://firebasestorage.googleapis.com/v0/b/capstone-fortnerf.appspot.com/o/profile_pictures%2Ftest_image.png?alt=media&token=783965c2-093d-4971-b1d4-9a9eb057b99e',
  host: false,
  loggedIn: false,
  x: 0,
  y: 0,
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registrationUser(state, { payload }) {
      state.id = payload.id;
      state.token = payload.token;
      state.username = payload.username;
      state.name = payload.name;
      state.email = payload.email;
      state.profilePicture = payload.profilePicture;
      state.loggedIn = true;
    },
    setCoords(state, { payload }) {
      state.x = payload.x;
      state.y = payload.y;
    },
    updateUsername(state, { payload }) {
      state.username = payload;
    },
    logout(state) {
      Object.assign(state, initialState);
      socket.removeAllListeners();
      socket.emit('logout');
    },
  },
});

export const { setCoords, updateUsername, logout, registrationUser } =
  userSlice.actions;
export default userSlice.reducer;
