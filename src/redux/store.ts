import { configureStore } from '@reduxjs/toolkit';
import difficultySlice from './SnakeGame/difficultySlice';

const store = configureStore({
  reducer: {
    difficulty: difficultySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
