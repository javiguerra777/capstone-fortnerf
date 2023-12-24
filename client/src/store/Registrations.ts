import { createSlice } from '@reduxjs/toolkit';

type RegistrationType = {
  email: string;
};
const initialState = {
  email: '',
} as RegistrationType;

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setEmail(state, { payload }) {
      state.email = payload;
    },
  },
});

export const { setEmail } = registrationSlice.actions;
export default registrationSlice.reducer;
