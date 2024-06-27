import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface TutorialProps {
  onDone: () => void;
  onBackToMenu: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onDone, onBackToMenu }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tutorial</Text>
      <Text style={styles.text}>Swipe up, down, left, or right to move the snake.</Text>
      <View style={styles.navigationButtons}>
        <Button title="Start Game" onPress={onDone} />
        <Button title="Back to Menu" onPress={onBackToMenu} />
      </View>
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
  header: {
    fontSize: 36,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default Tutorial;
