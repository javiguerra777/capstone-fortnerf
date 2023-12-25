import { createSlice } from '@reduxjs/toolkit';

type User = {
  docId: string;
  username: string;
  name: string;
  email: string;
  host: boolean;
  loggedIn: boolean;
  x: number;
  y: number;
};

const initialState = {
  docId: '',
  username: '',
  name: '',
  email: '',
  host: false,
  loggedIn: false,
  x: 0,
  y: 0,
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.docId = payload.id;
      state.username = payload.username;
      state.name = payload.name;
      state.email = payload.email;
      state.loggedIn = !state.loggedIn;
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
    },
  },
});

export const { setUser, setCoords, updateUsername, logout } =
  userSlice.actions;
export default userSlice.reducer;
