import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    usersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
