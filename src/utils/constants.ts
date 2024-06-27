import { Dimensions } from 'react-native';

export const CELL_SIZE = 20; // Размер каждой клетки
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const FIELD_WIDTH = Math.floor(SCREEN_WIDTH / CELL_SIZE);
export const FIELD_HEIGHT = Math.floor(SCREEN_HEIGHT / CELL_SIZE);

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
