import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CELL_SIZE } from 'utils/constants';

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
      backgroundColor: 'grey',
      borderRadius: 10,
      overflow: 'hidden',
      position: 'absolute',
      top: 150,
      left: (Dimensions.get('window').width - boardWidth) / 2,
      width: boardWidth,
      height: boardHeight,
    },
  });

  return (
    <View style={styles.board}>
      {children}
    </View>
  );
};

export default GameBoard;
