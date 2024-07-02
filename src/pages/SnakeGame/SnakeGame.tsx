import React, { useState } from "react";
import { View, StyleSheet, Alert, Button, Text } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import GameBoard from "./components/GameBoard";
import Snake from "./components/Snake";
import Food from "./components/Food";
import MainMenu from "./components/MainMenu";
import Tutorial from "./components/Tutorial";
import GameControls from "./components/GameControls";
import ScoreDisplay from "./components/ScoreDisplay";
import { useGameLogic } from "./hooks/useGameLogic";
import { useGestureHandler } from "./hooks/useGestureHandler";

const SnakeGame = () => {
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true);

  const {
    snake,
    food,
    direction,
    setDirection,
    score,
    gameOver,
    resetGame,
    paused,
    setPaused,
    fieldWidth,
    fieldHeight,
  } = useGameLogic(showMainMenu, showTutorial);

  const handleGesture = useGestureHandler(direction, setDirection);

  const handlePauseResume = () => {
    setPaused(!paused);
  };

  const handleExitGame = () => {
    setPaused(true);
    setShowMainMenu(true);
  };

  const handleStartGame = () => {
    resetGame();
    setShowMainMenu(false);
    setPaused(false);
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
    setShowMainMenu(false);
  };

  const handleBackToMenu = () => {
    setShowTutorial(false);
    setShowMainMenu(true);
  };

  if (showTutorial) {
    return (
      <Tutorial
        onDone={() => setShowTutorial(false)}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (showMainMenu) {
    return (
      <MainMenu onStart={handleStartGame} onShowTutorial={handleShowTutorial} />
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.containerContent}>
          <GameBoard fieldWidth={fieldWidth} fieldHeight={fieldHeight}>
            <Snake segments={snake} />
            <Food position={food} />
          </GameBoard>
          <GameControls
            paused={paused}
            onPauseResume={handlePauseResume}
            onExitGame={handleExitGame}
          />
          <ScoreDisplay score={score} />
          {gameOver && (
            <View style={styles.overlay}>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayHeader}>Game Over</Text>
                <Text style={styles.overlayText}>Your score: {score}</Text>
                <Button title="Restart" onPress={resetGame} />
                <Button title="Back to Menu" onPress={handleBackToMenu} />
              </View>
            </View>
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
  },
  overlayHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default SnakeGame;
