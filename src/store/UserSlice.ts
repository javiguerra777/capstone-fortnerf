import { createSlice } from '@reduxjs/toolkit';

type User = {
  username: string;
  name: string;
  email: string;
  loggedIn: boolean;
};

const initialState = {
  username: '',
  name: '',
  email: '',
  loggedIn: false,
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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
