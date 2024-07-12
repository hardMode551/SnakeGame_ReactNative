import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import ImageSelectionModal from "./components/ImageSelectionModal";
import { ImageSetKey } from "./utils/imageSets";
import { useAppDispatch } from "./store/hooks";
import { setCurrentImageType } from "./store/imageSetsSlice";

const ThreeInARow: React.FC = () => {
  const [score, setScore] = useState(0);
  const [imageType, setImageType] = useState<ImageSetKey>("cats");
  const [modalVisible, setModalVisible] = useState(true);

  const dispatch = useAppDispatch();

  const handleScoreUpdate = (newScore: number) => {
    setScore((prevScore) => prevScore + newScore);
  };

  const handleImageTypeSelect = (type: ImageSetKey) => {
    setImageType(type);
    dispatch(setCurrentImageType(type));
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ImageSelectionModal
          onClose={() => setModalVisible(false)}
          isVisible={modalVisible}
          onSelect={handleImageTypeSelect}
        />
        {imageType !== null && (
          <View style={styles.gameContainer}>
            <ScoreBoard score={score} />
            <GameBoard
              onScoreUpdate={handleScoreUpdate}
              imageType={imageType}
            />
          </View>
        )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThreeInARow;
