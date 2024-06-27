import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

interface MainMenuProps {
  onStart: () => void;
  onShowTutorial: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onShowTutorial }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Snake Game</Text>
      <Image style={styles.image} source={require('../assets/Snake.png')} />
      <Button title="Start Game" onPress={onStart} />
      <Button title="Tutorial" onPress={onShowTutorial} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'lightgray',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 2,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default MainMenu;
