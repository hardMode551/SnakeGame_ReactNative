export type TileType = 'Cat_1' | 'Cat_2' | 'Cat_3' | 'Cat_4' | 'Cat_5' | 'Cat_6' | 'Cat_7' | 'Cat_8';

export interface TileData {
  id: string;
  type: TileType;
}

export type TileDataOrNull = TileData | null;

export interface Position {
  row: number;
  col: number;
}