import { createImageSet, ImageSetType } from './types';

export const fruitImages = createImageSet({
  fruit_1: require('../images/fruit/fruit_1.png'),
  fruit_2: require('../images/fruit/fruit_2.png'),
  fruit_3: require('../images/fruit/fruit_3.png'),
  fruit_4: require('../images/fruit/fruit_4.png'),
  fruit_5: require('../images/fruit/fruit_5.png'),
  fruit_6: require('../images/fruit/fruit_6.png'),
  fruit_7: require('../images/fruit/fruit_7.png'),
  fruit_8: require('../images/fruit/fruit_8.png')
});

export const catImages = createImageSet({
  Cat_1: require('../images/cat/Cat_1.png'),
  Cat_2: require('../images/cat/Cat_2.png'),
  Cat_3: require('../images/cat/Cat_3.png'),
  Cat_4: require('../images/cat/Cat_4.png'),
  Cat_5: require('../images/cat/Cat_5.png'),
  Cat_6: require('../images/cat/Cat_6.png'),
  Cat_7: require('../images/cat/Cat_7.png'),
  Cat_8: require('../images/cat/Cat_8.png')
});

export const somethingAnotherImages = createImageSet({
  somethingAnother_1: require('../images/cat/Cat_3.png'),
  somethingAnother_2: require('../images/cat/Cat_3.png'),
  somethingAnother_3: require('../images/cat/Cat_3.png'),
  somethingAnother_4: require('../images/cat/Cat_3.png'),
  somethingAnother_5: require('../images/cat/Cat_3.png'),
  somethingAnother_6: require('../images/cat/Cat_3.png'),
  somethingAnother_7: require('../images/cat/Cat_3.png'),
  somethingAnother_8: require('../images/cat/Cat_3.png'),
});

// Использование:
export type FruitTileType = ImageSetType<typeof fruitImages>;
export type CatTileType = ImageSetType<typeof catImages>;
export type SomethingAnotherTileType = ImageSetType<typeof somethingAnotherImages>;

// Если нужно объединить все типы:
export type AllTileTypes = FruitTileType | CatTileType | SomethingAnotherTileType;