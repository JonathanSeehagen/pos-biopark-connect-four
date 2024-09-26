export type Player =
  | "red"
  | "orange"
  | "blue"
  | "green"
  | "purple"
  | "black"
  | "X"
  | "O";
export type BoardType = Player[][];

export const createEmptyBoard = (rows: number, cols: number): BoardType => {
  const board = Array.from({ length: rows }, () => Array(cols).fill(null));
  return board;
};

export const checkWinner = (
  board: BoardType,
  row: number,
  col: number,
  player: Player,
  winCondition: number
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
    for (let i = -winCondition + 1; i < winCondition; i++) {
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
        if (count === winCondition) return true;
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

// Funções específicas para o Connect Four
export const connectFourWinCondition = 4;
export const checkConnectFourWinner = (
  board: BoardType,
  row: number,
  col: number,
  player: Player
): boolean => checkWinner(board, row, col, player, connectFourWinCondition);

// Funções específicas para o Tic Tac Toe
export const ticTacToeWinCondition = 3;
export const checkTicTacToeWinner = (
  board: BoardType,
  row: number,
  col: number,
  player: Player
): boolean => checkWinner(board, row, col, player, ticTacToeWinCondition);
