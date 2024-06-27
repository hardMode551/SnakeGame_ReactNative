import { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { CELL_SIZE, Direction } from '../utils/constants';

const calculateFieldDimensions = () => {
  const { width, height } = Dimensions.get('window');
  const fieldWidth = Math.floor((width - 80) / CELL_SIZE);
  const fieldHeight = Math.floor((height - 160) / CELL_SIZE);
  return { fieldWidth, fieldHeight };
};

export const useGameLogic = (showMainMenu: boolean, showTutorial: boolean) => {
  const { fieldWidth, fieldHeight } = calculateFieldDimensions();

  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const generateFoodPosition = () => {
    const newFood = {
      x: Math.floor(Math.random() * fieldWidth),
      y: Math.floor(Math.random() * fieldHeight),
    };
    return newFood;
  };

  useEffect(() => {
    const handleMovement = () => {
      if (gameOver || paused || showTutorial || showMainMenu) return;

      const directions = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
      };

      const { x: dx, y: dy } = directions[direction];
      const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (newHead.x < 0 || newHead.x >= fieldWidth || newHead.y < 0 || newHead.y >= fieldHeight) {
        setGameOver(true);
        Alert.alert('Game Over', `Your score: ${score}`, [{ text: 'Restart', onPress: resetGame }]);
        return;
      }

      if (snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        Alert.alert('Game Over', `Your score: ${score}`, [{ text: 'Restart', onPress: resetGame }]);
        return;
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        setFood(generateFoodPosition());
        setSnake([newHead, ...snake]);
      } else {
        const newSnake = [newHead, ...snake.slice(0, -1)];
        setSnake(newSnake);
      }
    };

    const movementInterval = setInterval(handleMovement, 100);

    return () => {
      clearInterval(movementInterval);
    };
  }, [snake, food, direction, gameOver, paused, showTutorial, showMainMenu, fieldWidth, fieldHeight]);

  const resetGame = () => {
    setSnake([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  return {
    snake,
    food,
    direction,
    setDirection,
    score,
    gameOver,
    resetGame,
    paused,
    setPaused,
    fieldWidth,
    fieldHeight,
  };
};

