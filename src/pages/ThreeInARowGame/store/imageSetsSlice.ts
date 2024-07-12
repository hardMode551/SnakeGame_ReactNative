import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSetKey, imageSets } from '../utils/imageSets';

interface ImageSetsState {
  currentImageType: ImageSetKey | null;
}

const initialState: ImageSetsState = {
  currentImageType: 'cats' as ImageSetKey,
};

const imageSetsSlice = createSlice({
  name: 'imageSets',
  initialState,
  reducers: {
    setCurrentImageType: (state, action: PayloadAction<ImageSetKey | null>) => {
      state.currentImageType = action.payload;
    },
  },
});

export const { setCurrentImageType } = imageSetsSlice.actions;
export default imageSetsSlice.reducer;