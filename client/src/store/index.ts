import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice';
import DirectMessagesApi from '../common/api/DirectMessagesApi.js';

const persistConfig = {
  key: 'capstone-fortnerf',
  storage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  user: UserSlice,
  [DirectMessagesApi.reducerPath]: DirectMessagesApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(DirectMessagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
