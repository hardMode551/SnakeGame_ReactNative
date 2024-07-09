import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Tile from "./Tile";
import { TileData, TileDataOrNull, Position } from "../utils/types";
import {
  createInitialBoard,
  checkMatches,
  swapTiles,
  removeTiles,
  fillEmptyCells,
  calculateScore,
  BOARD_SIZE,
} from "../utils/GameLogic";

interface GameBoardProps {
  onScoreUpdate: (score: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onScoreUpdate }) => {
  const [board, setBoard] = useState<TileDataOrNull[][]>(createInitialBoard());
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);

  const processMatches = React.useCallback(() => {
    let newBoard = board;
    let totalScore = 0;
    let hasMatches;

    do {
      hasMatches = false;
      const matches = checkMatches(newBoard);
      if (matches.length > 0) {
        hasMatches = true;
        totalScore += calculateScore(matches);
        newBoard = removeTiles(newBoard, matches);
        newBoard = fillEmptyCells(newBoard);
      }
    } while (hasMatches);

    if (totalScore > 0) {
      setBoard(newBoard);
      onScoreUpdate(totalScore);
    }
  }, [board, onScoreUpdate]);

  useEffect(() => {
    processMatches();
  }, [processMatches]);

  const handleSwipe = React.useCallback((row: number, col: number, direction: 'left' | 'right' | 'up' | 'down') => {
    if (selectedTile) {
      let newRow = selectedTile.row;
      let newCol = selectedTile.col;

      switch (direction) {
        case 'left': newCol = Math.max(0, newCol - 1); break;
        case 'right': newCol = Math.min(BOARD_SIZE - 1, newCol + 1); break;
        case 'up': newRow = Math.max(0, newRow - 1); break;
        case 'down': newRow = Math.min(BOARD_SIZE - 1, newRow + 1); break;
      }

      if (newRow !== selectedTile.row || newCol !== selectedTile.col) {
        const newBoard = swapTiles(board, selectedTile, { row: newRow, col: newCol });
        setBoard(newBoard);
      }
      setSelectedTile(null);
    } else {
      setSelectedTile({ row, col });
    }
  }, [selectedTile, board]);

  const handleTilePress = (row: number, col: number) => {
    if (selectedTile) {
      // Если плитка уже выбрана, попробуйте выполнить свайп
      const rowDiff = row - selectedTile.row;
      const colDiff = col - selectedTile.col;
      
      if (Math.abs(rowDiff) + Math.abs(colDiff) === 1) {
        // Плитки соседние, можно выполнить свайп
        const direction = rowDiff === -1 ? 'up' : rowDiff === 1 ? 'down' : colDiff === -1 ? 'left' : 'right';
        handleSwipe(selectedTile.row, selectedTile.col, direction as 'left' | 'right' | 'up' | 'down');
      } else {
        // Плитки не соседние, просто выбираем новую плитку
        setSelectedTile({ row, col });
      }
    } else {
      // Если плитка не выбрана, выбираем её
      setSelectedTile({ row, col });
    }
  };

  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map(
            (tile, colIndex) =>
              tile && (
                <Tile
                  key={tile.id}
                  tile={tile}
                  onSwipe={(direction) =>
                    handleSwipe(rowIndex, colIndex, direction)
                  }
                  onPress={() => handleTilePress(rowIndex, colIndex)}
                  isSelected={
                    selectedTile?.row === rowIndex &&
                    selectedTile?.col === colIndex
                  }
                />
              )
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});

export default GameBoard;
