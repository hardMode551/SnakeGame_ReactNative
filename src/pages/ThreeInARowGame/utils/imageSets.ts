import { ImageSets } from './types';
import { catImages, fruitImages, somethingAnotherImages } from './choiseImages';

export const imageSets: ImageSets = {
  cats: catImages,
  fruits: fruitImages,
  somethingAnother: somethingAnotherImages
};

export type ImageSetKey = keyof typeof imageSets;