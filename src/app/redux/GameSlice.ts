import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  id: string;
  disableKeyBoard: boolean;
  leftGame: boolean;
};
const initialState = {
  id: '',
  disableKeyBoard: false,
  leftGame: false,
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
  },
});

export const { setId, disableKeyBoard, enableKeyBoard, leaveGame } =
  gameSlice.actions;
export default gameSlice.reducer;
