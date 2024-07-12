export type TileType = string;

export interface TileData {
  id: string;
  type: TileType;
}

export type TileDataOrNull = TileData | null;

export interface Position {
  row: number;
  col: number;
  targetRow?: number;
}

export type ImageSource = ReturnType<typeof require>;

export interface ImageSet {
  [key: string]: ImageSource;
}

export type ImageSets = {
  [key: string]: ImageSet;
};

// Функция для создания объекта с изображениями
export function createImageSet<T extends ImageSet>(images: T): T {
  return images;
}

// Функция для получения типов из объекта с изображениями
export type ImageSetType<T extends ImageSet> = keyof T;
