import { TileData, TileDataOrNull, TileType, Position } from './types';

export const BOARD_SIZE = 6;
const MATCH_LENGTH = 3;

let tileIdCounter = 0;

function generateUniqueId(): string {
  return `tile-${tileIdCounter++}`;
}

export function createInitialBoard(): TileDataOrNull[][] {
  const board: TileData[][] = [];
  const tileTypes: TileType[] = ['Cat_1', 'Cat_2', 'Cat_3', 'Cat_4', 'Cat_5', 'Cat_6', 'Cat_7', 'Cat_8'];

  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
      board[row][col] = { id: generateUniqueId(), type: randomType };
    }
  }

  return board;
}

export function checkMatches(board: TileDataOrNull[][]): Position[] {
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

export function swapTiles(board: TileDataOrNull[][], pos1: Position, pos2: Position): TileDataOrNull[][] {
  const newBoard = board.map(row => [...row]);
  const temp = newBoard[pos1.row][pos1.col];
  newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
  newBoard[pos2.row][pos2.col] = temp;
  return newBoard;
}

export function removeTiles(board: TileDataOrNull[][], positions: Position[]): TileDataOrNull[][] {
  const newBoard = [...board];
  positions.forEach(({ row, col }) => {
    newBoard[row][col] = null;
  });
  return newBoard;
}

export function fillEmptyCells(board: TileDataOrNull[][]): TileDataOrNull[][] {
  const newBoard = board.map(row => [...row]);
  const tileTypes: TileType[] = ['Cat_1', 'Cat_2', 'Cat_3', 'Cat_4', 'Cat_5', 'Cat_6', 'Cat_7', 'Cat_8'];

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

export function calculateScore(matches: Position[]): number {
  return matches.length * 10;
}