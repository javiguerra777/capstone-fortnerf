import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  id: string;
  disableKeyBoard: boolean;
};
const initialState = {
  id: '',
  disableKeyBoard: false,
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
  },
});

export const { setId, disableKeyBoard, enableKeyBoard } =
  gameSlice.actions;
export default gameSlice.reducer;
