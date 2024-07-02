import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType, Animated, Easing } from 'react-native';

const gemSize = 48;
const numRows = 6;
const numCols = 6;
const imagesCoin = [
  require('../images/coin/coin_1.png'),
  require('../images/coin/coin_2.png'),
  require('../images/coin/coin_3.png'),
  require('../images/coin/coin_4.png'),
  require('../images/coin/coin_5.png'),
  require('../images/coin/coin_6.png'),
  require('../images/coin/coin_7.png'),
  require('../images/coin/coin_8.png'),
];

type GemType = {
  imageSource: ImageSourcePropType;
  row: number;
  col: number;
};

const BoardComponent: React.FC = () => {
  const [gems, setGems] = useState<GemType[][]>([]);
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const [selectedCol, setSelectedCol] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false); // State to track animation

  // Animated values for animation
  const opacity = useRef(new Animated.Value(1)).current;

  const initializeGame = () => {
    const initialGems: GemType[][] = [];
    for (let i = 0; i < numRows; i++) {
      initialGems[i] = [];
      for (let j = 0; j < numCols; j++) {
        initialGems[i][j] = {
          imageSource: imagesCoin[Math.floor(Math.random() * imagesCoin.length)],
          row: i,
          col: j,
        };
      }
    }
    setGems(initialGems);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleGemPress = (row: number, col: number) => {
    if (selectedRow === -1 && selectedCol === -1) {
      setSelectedRow(row);
      setSelectedCol(col);
    } else {
      if ((Math.abs(selectedRow - row) === 1 && selectedCol === col) || (Math.abs(selectedCol - col) === 1 && selectedRow === row)) {
        handleGemSwap(selectedRow, selectedCol, row, col);
      } else {
        setSelectedRow(row);
        setSelectedCol(col);
      }
    }
  };

  const handleGemSwap = (row1: number, col1: number, row2: number, col2: number) => {
    const updatedGems = [...gems];
    const temp = updatedGems[row1][col1];
    updatedGems[row1][col1] = updatedGems[row2][col2];
    updatedGems[row2][col2] = temp;
    setGems(updatedGems);

    checkAndRemoveMatches(row1, col1, row2, col2);
  };

  const checkAndRemoveMatches = (row1: number, col1: number, row2: number, col2: number) => {
    const gemToRemove: boolean[][] = [];
    const visited: boolean[][] = [];
    for (let i = 0; i < numRows; i++) {
      gemToRemove[i] = [];
      visited[i] = [];
      for (let j = 0; j < numCols; j++) {
        gemToRemove[i][j] = false;
        visited[i][j] = false;
      }
    }

    // Check horizontal matches
    for (let i = 0; i < numRows; i++) {
      let count = 1;
      for (let j = 1; j < numCols; j++) {
        if (gems[i][j].imageSource === gems[i][j - 1].imageSource) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = j - count; k < j; k++) {
              gemToRemove[i][k] = true;
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let k = numCols - count; k < numCols; k++) {
          gemToRemove[i][k] = true;
        }
      }
    }

    // Check vertical matches
    for (let j = 0; j < numCols; j++) {
      let count = 1;
      for (let i = 1; i < numRows; i++) {
        if (gems[i][j].imageSource === gems[i - 1][j].imageSource) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = i - count; k < i; k++) {
              gemToRemove[k][j] = true;
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let k = numRows - count; k < numRows; k++) {
          gemToRemove[k][j] = true;
        }
      }
    }

    let removedCount = 0;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (gemToRemove[i][j]) {
          // Animate the removal
          animateGemRemoval(i, j);
          removedCount++;
        }
      }
    }

    if (removedCount > 0) {
      setScore(score + calculateScore(removedCount));
    }
  };

  const animateGemRemoval = (row: number, col: number) => {
    // Start animation
    setAnimating(true);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Animation complete
      // Replace gem with new random gem
      const updatedGems = [...gems];
      updatedGems[row][col] = {
        imageSource: imagesCoin[Math.floor(Math.random() * imagesCoin.length)],
        row: row,
        col: col,
      };
      setGems(updatedGems);
      // Reset opacity value
      opacity.setValue(1);
      // Set animating to false after updating state
      setAnimating(false);
    });
  };

  const calculateScore = (removedCount: number) => {
    return removedCount * 10; // Example: increment score by 10 for each removed gem
  };

  const renderGems = () => {
    return gems.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((gem, colIndex) => (
          <TouchableOpacity
            key={`${rowIndex}_${colIndex}`}
            style={styles.gem}
            onPress={() => handleGemPress(gem.row, gem.col)}
          >
            <Animated.View style={[styles.imageContainer, { opacity }]}>
              <Image source={gem.imageSource} style={styles.image} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.board}>{renderGems()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 24,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  gem: {
    width: gemSize,
    height: gemSize,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#525053',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default BoardComponent;
