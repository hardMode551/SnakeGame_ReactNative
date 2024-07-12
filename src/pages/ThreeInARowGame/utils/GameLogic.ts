import { TileData, TileDataOrNull, TileType, Position } from './types';
import { ImageSetKey, imageSets } from './imageSets';

export const BOARD_SIZE = 6;
const MATCH_LENGTH = 3;

let tileIdCounter = 0;

function generateUniqueId(): string {
  return `tile-${tileIdCounter++}`;
}

export function createGameLogic(imageType: ImageSetKey | null) {
  function getTileTypes(): TileType[] {
    if (imageType && imageType in imageSets) {
      return Object.keys(imageSets[imageType as keyof typeof imageSets]);
    }
    // Значение по умолчанию - первый набор из imageSets
    const defaultKey = Object.keys(imageSets)[0] as keyof typeof imageSets;
    return Object.keys(imageSets[defaultKey]);
  }

  function createInitialBoard(): TileDataOrNull[][] {
    const board: TileData[][] = [];
    const tileTypes = getTileTypes();

    for (let row = 0; row < BOARD_SIZE; row++) {
      board[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
        board[row][col] = { id: generateUniqueId(), type: randomType };
      }
    }

    return board;
  }

  function updateBoardTypes(board: TileDataOrNull[][]): TileDataOrNull[][] {
    const tileTypes = getTileTypes();
    return board.map(row => 
      row.map(tile => 
        tile ? { ...tile, type: tileTypes[Math.floor(Math.random() * tileTypes.length)] } : null
      )
    );
  }
  
  function checkMatches(board: TileDataOrNull[][]): Position[] {
    const matches: Position[] = [];
    const checkedPositions: boolean[][] = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(false));
  
    function checkAdjacentMatches(row: number, col: number, type: TileType) {
      const localMatches: Position[] = [];
      const stack: Position[] = [{ row, col }];
      
      while (stack.length > 0) {
        const current = stack.pop()!;
        if (checkedPositions[current.row][current.col]) continue;
        
        localMatches.push(current);
        checkedPositions[current.row][current.col] = true;
  
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of directions) {
          const newRow = current.row + dx;
          const newCol = current.col + dy;
          if (
            newRow >= 0 && newRow < BOARD_SIZE &&
            newCol >= 0 && newCol < BOARD_SIZE &&
            board[newRow][newCol]?.type === type &&
            !checkedPositions[newRow][newCol]
          ) {
            stack.push({ row: newRow, col: newCol });
          }
        }
      }
  
      if (localMatches.length >= 3) {
        matches.push(...localMatches);
      }
    }
  
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const tile = board[row][col];
        if (tile && !checkedPositions[row][col]) {
          checkAdjacentMatches(row, col, tile.type);
        }
      }
    }
  
    return matches;
  }
  
  function swapTiles(board: TileDataOrNull[][], pos1: Position, pos2: Position): TileDataOrNull[][] {
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[pos1.row][pos1.col];
    newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
    newBoard[pos2.row][pos2.col] = temp;
    return newBoard;
  }
  
  function removeTiles(board: TileDataOrNull[][], positions: Position[]): TileDataOrNull[][] {
    const newBoard = [...board];
    positions.forEach(({ row, col }) => {
      newBoard[row][col] = null;
    });
    return newBoard;
  }
  
  function fillEmptyCells(board: TileDataOrNull[][]): TileDataOrNull[][] {
    const newBoard = board.map(row => [...row]);
    const tileTypes = getTileTypes();

    for (let col = 0; col < BOARD_SIZE; col++) {
      let emptyCount = 0;
      for (let row = BOARD_SIZE - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          emptyCount++;
        } else if (emptyCount > 0) {
          newBoard[row + emptyCount][col] = newBoard[row][col];
          newBoard[row][col] = null;
        }
      }

      for (let row = 0; row < emptyCount; row++) {
        const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
        newBoard[row][col] = { id: generateUniqueId(), type: randomType };
      }
    }

    return newBoard;
  }

  
  function calculateScore(matches: Position[]): number {
    return matches.length * 10;
  }

  return {
    createInitialBoard,
    updateBoardTypes,
    checkMatches,
    swapTiles,
    removeTiles,
    fillEmptyCells,
    calculateScore,
  };
}

