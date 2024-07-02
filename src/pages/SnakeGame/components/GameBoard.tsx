import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CELL_SIZE } from 'pages/SnakeGame/utils/constants';

interface GameBoardProps {
  fieldWidth: number;
  fieldHeight: number;
  children: React.ReactNode;
}

const GameBoard: React.FC<GameBoardProps> = ({ fieldWidth, fieldHeight, children }) => {
  const boardWidth = fieldWidth * CELL_SIZE;
  const boardHeight = fieldHeight * CELL_SIZE;

  // Динамически вычисляем стили на основе пропсов
  const styles = StyleSheet.create({
    board: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: 'grey',
      overflow: 'hidden',
      
      width: boardWidth,
      height: boardHeight,

      marginTop: 20,
    },
  });

  return (
    <View style={styles.board}>
      {children}
    </View>
  );
};

export default GameBoard;
