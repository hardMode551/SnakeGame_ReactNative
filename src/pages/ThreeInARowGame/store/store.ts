import { configureStore } from '@reduxjs/toolkit';
import imageSetsReducer from './imageSetsSlice';

export const store = configureStore({
  reducer: {
    imageSets: imageSetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;