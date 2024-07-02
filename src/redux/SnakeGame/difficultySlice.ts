import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  difficulty: Difficulty;
}

const initialState: GameState = {
  difficulty: 'medium',
};

const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      state.difficulty = action.payload;
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;

export default difficultySlice.reducer;
