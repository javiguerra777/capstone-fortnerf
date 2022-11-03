import { createSlice } from '@reduxjs/toolkit';
import updateLocalStorage, {
  deleteLocalStorage,
} from './local-storage';

type User = {
  docId: string;
  username: string;
  name: string;
  email: string;
  host: boolean;
  loggedIn: boolean;
  connected: boolean;
  x: number;
  y: number;
  playerSprite: string;
};

const initialState = {
  docId: localStorage.getItem('id') || '',
  username: localStorage.getItem('username') || '',
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
  host: false,
  loggedIn: localStorage.getItem('loggedIn') || false,
  connected: false,
  x: 0,
  y: 0,
  playerSprite: localStorage.getItem('sprite') || 'player',
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // used for signing up user, logging in user, and logging user out of app
    setUser(state, { payload }) {
      state.docId = payload.id;
      state.username = payload.username;
      state.name = payload.name;
      state.email = payload.email;
      state.playerSprite = payload.sprite || 'player';
      state.loggedIn = payload.loggedIn;
      if (payload.loggedIn) {
        updateLocalStorage(payload);
      } else {
        deleteLocalStorage();
      }
    },
    setConnected(state) {
      state.connected = true;
    },
    setCoords(state, { payload }) {
      state.x = payload.x;
      state.y = payload.y;
    },
    updateUsername(state, { payload }) {
      state.username = payload;
      localStorage.setItem('username', payload);
    },
    changePlayerSprite(state, { payload }) {
      state.playerSprite = payload;
      localStorage.setItem('sprite', payload);
    },
  },
});

export const {
  setUser,
  setConnected,
  setCoords,
  updateUsername,
  changePlayerSprite,
} = userSlice.actions;
export default userSlice.reducer;
