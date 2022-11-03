import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import GameSlice from './GameSlice';
import RegistrationSlice from './Registrations';

const store = configureStore({
  reducer: {
    user: UserSlice,
    game: GameSlice,
    registration: RegistrationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
