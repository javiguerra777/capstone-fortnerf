import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  id: string;
  disableKeyBoard: boolean;
  leftGame: boolean;
  data: any;
};
const initialState = {
  id: '',
  disableKeyBoard: false,
  leftGame: false,
  data: {},
} as GameState;

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // used changing id of game
    setId(state, { payload }) {
      state.id = payload;
    },
    disableKeyBoard(state) {
      state.disableKeyBoard = true;
    },
    enableKeyBoard(state) {
      state.disableKeyBoard = false;
    },
    leaveGame(state) {
      state.leftGame = true;
    },
    updateData(state, { payload }) {
      state.data = payload;
    },
  },
});

export const {
  setId,
  disableKeyBoard,
  enableKeyBoard,
  leaveGame,
  updateData,
} = gameSlice.actions;
export default gameSlice.reducer;
