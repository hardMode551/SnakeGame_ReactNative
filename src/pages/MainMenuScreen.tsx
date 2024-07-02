import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Props {
  navigation: any;
}

const MainMenuScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBtn}>
        <Button title="SnakeGame" onPress={() => navigation.navigate('SnakeGame')} />
        <Button title="Three in a Row" onPress={() => navigation.navigate('ThreeInARow')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', 
    padding: 10,
  },
  containerBtn: {
    gap: 20,
  },
});

export default MainMenuScreen;
