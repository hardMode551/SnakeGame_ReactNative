import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface GameControlsProps {
  paused: boolean;
  onPauseResume: () => void;
  onExitGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ paused, onPauseResume, onExitGame }) => {
  return (
    <View style={styles.pauseButtonContainer}>
      <Button title={paused ? 'Resume' : 'Pause'} onPress={onPauseResume} />
      <Button title="Exit" onPress={onExitGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  pauseButtonContainer: {
    position: 'absolute',
    top: 80,
    left: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default GameControls;
