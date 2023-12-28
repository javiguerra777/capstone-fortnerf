import {
  configureStore,
  combineReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice, { resetStore } from './UserSlice';
import DirectMessagesApi from '../common/api/DirectMessagesApi.js';

const persistConfig = {
  key: 'capstone-fortnerf',
  storage,
  whitelist: ['user'],
};
const appReducer = combineReducers({
  user: UserSlice,
  [DirectMessagesApi.reducerPath]: DirectMessagesApi.reducer,
});
const rootReducer = (
  state: RootState | undefined,
  action: AnyAction,
): RootState => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(DirectMessagesApi.middleware),
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
