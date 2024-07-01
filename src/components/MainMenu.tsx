import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

interface MainMenuProps {
  onStart: () => void;
  onShowTutorial: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onShowTutorial }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Snake game</Text>
      <Image style={styles.image} source={require('../assets/Snake.png')} />
      <View style={styles.btnList}>
        <Button title={'Start Game'} onPress={onStart} />
        <Button title={'Tutorial'} onPress={onShowTutorial} />
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
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  btnList: {
    gap: 20,
  }
});



export default MainMenu;
