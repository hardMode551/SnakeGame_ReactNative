import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './components/BoardComponent';

const ThreeInARow = () => {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default ThreeInARow;
