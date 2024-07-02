import { useCallback } from 'react';
import { Direction } from '../utils/constants';

export const useGestureHandler = (currentDirection: Direction, setDirection: (direction: Direction) => void) => {
  return useCallback((event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    
    // Determine the absolute values of translations
    const absX = Math.abs(translationX);
    const absY = Math.abs(translationY);

    // Check if the movement is predominantly horizontal or vertical
    if (absX > absY) {
      // Horizontal swipe
      if (translationX > 0 && currentDirection !== 'LEFT') {
        setDirection('RIGHT');
      } else if (translationX < 0 && currentDirection !== 'RIGHT') {
        setDirection('LEFT');
      }
    } else {
      // Vertical swipe
      if (translationY > 0 && currentDirection !== 'UP') {
        setDirection('DOWN');
      } else if (translationY < 0 && currentDirection !== 'DOWN') {
        setDirection('UP');
      }
    }
  }, [currentDirection, setDirection]);
};
