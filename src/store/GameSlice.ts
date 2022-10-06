import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // used changing id of game
    setId(state, { payload }) {
      state.id = payload;
    },
  },
});

export const { setId } = gameSlice.actions;
export default gameSlice.reducer;
