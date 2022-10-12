import { createSlice } from '@reduxjs/toolkit';

type User = {
  username: string;
  name: string;
  email: string;
  loggedIn: boolean;
  connected: boolean;
  x: number;
  y: number;
};

const initialState = {
  username: '',
  name: '',
  email: '',
  loggedIn: false,
  connected: false,
  x: 0,
  y: 0,
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // used for signing up user, logging in user, and logging user out of app
    setUser(state, { payload }) {
      state.username = payload.username;
      state.name = payload.name;
      state.email = payload.email;
      state.loggedIn = !state.loggedIn;
    },
    setConnected(state) {
      state.connected = true;
    },
    setCoords(state, { payload }) {
      state.x = payload.x;
      state.y = payload.y;
    },
  },
});

export const { setUser, setConnected, setCoords } = userSlice.actions;
export default userSlice.reducer;
