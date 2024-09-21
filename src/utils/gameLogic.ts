export type Player = "red" | "yellow" | "blue" | "green" | "purple" | "black";

export type BoardType = Player[][];

export const createEmptyBoard = (rows: number, cols: number): BoardType => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));
};

export const checkWinner = (
  board: BoardType,
  row: number,
  col: number,
  player: Player
): boolean => {
  if (!player) return false;

  const directions = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal direita
    { x: 1, y: -1 }, // Diagonal esquerda
  ];

  const isWinningSequence = (
    r: number,
    c: number,
    xDir: number,
    yDir: number
  ): boolean => {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const newRow = r + i * yDir;
      const newCol = c + i * xDir;
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        board[newRow][newCol] === player
      ) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  };

  for (const { x, y } of directions) {
    if (isWinningSequence(row, col, x, y)) return true;
  }

  return false;
};

export const isBoardFull = (board: BoardType): boolean => {
  return board.every((row) => row.every((cell) => cell !== null));
};

export const getNextEmptyRow = (
  board: BoardType,
  colIndex: number
): number | null => {
  for (let rowIndex = board.length - 1; rowIndex >= 0; rowIndex--) {
    if (board[rowIndex][colIndex] === null) {
      return rowIndex;
    }
  }
  return null; // Coluna está cheia
};
