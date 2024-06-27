import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_SIZE } from '../utils/constants';

interface SnakeProps {
  segments: { x: number; y: number }[];
}

const Snake: React.FC<SnakeProps> = ({ segments }) => {
  return (
    <>
      {segments.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            { left: segment.x * CELL_SIZE, top: segment.y * CELL_SIZE },
          ]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  segment: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'black',
    position: 'absolute',

    borderRadius: 5,
  },
});

export default Snake;
