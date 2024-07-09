import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';

const ThreeInARow: React.FC = () => {
  const [score, setScore] = React.useState(0);

  const handleScoreUpdate = (newScore: number) => {
    setScore((prevScore) => prevScore + newScore);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScoreBoard score={score} />
        <GameBoard onScoreUpdate={handleScoreUpdate} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThreeInARow;
