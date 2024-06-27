import { useCallback } from 'react';
import { Direction } from '../utils/constants';

export const useGestureHandler = (setDirection: (direction: Direction) => void) => {
  return useCallback((event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) setDirection('RIGHT');
      else setDirection('LEFT');
    } else {
      if (translationY > 0) setDirection('DOWN');
      else setDirection('UP');
    }
  }, [setDirection]);
};
