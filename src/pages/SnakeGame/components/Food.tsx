import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_SIZE } from '../utils/constants';

interface FoodProps {
  position: { x: number; y: number };
}

const Food: React.FC<FoodProps> = ({ position }) => {
  return (
    <View
      style={[
        styles.food,
        { left: position.x * CELL_SIZE, top: position.y * CELL_SIZE },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'red',
    position: 'absolute',

    borderRadius: 50,
  },
});

export default Food;
