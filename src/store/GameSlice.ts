import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // used for signing up user, logging in user, and logging user out of app
    setId(state, { payload }) {
      state.id = payload;
    },
  },
});

export const { setId } = gameSlice.actions;
export default gameSlice.reducer;
