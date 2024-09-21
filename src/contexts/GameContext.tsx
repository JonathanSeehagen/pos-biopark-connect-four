import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createEmptyBoard,
  checkWinner,
  isBoardFull,
  getNextEmptyRow,
  Player,
  BoardType,
} from "../utils/gameLogic";

type PlayerInfo = {
  name: string;
  color: Player;
};

type GameContextType = {
  board: BoardType;
  currentPlayer: PlayerInfo | null;
  player1: PlayerInfo | null;
  player2: PlayerInfo | null;
  winner: PlayerInfo | "draw" | null;
  moves: number;
  mode: "multiplayer" | "vsComputer";
  player1Color: Player | null;
  player2Color: Player | null;
  setPlayer1: (player: PlayerInfo) => void;
  setPlayer2: (player: PlayerInfo) => void;
  setCurrentPlayer: (player: PlayerInfo | null) => void;
  setBoard: (board: BoardType) => void;
  setWinner: (winner: PlayerInfo | "draw" | null) => void;
  setMoves: (moves: number) => void;
  setMode: (mode: "multiplayer" | "vsComputer") => void;
  setPlayer1Color: (color: Player) => void;
  setPlayer2Color: (color: Player) => void;
  handleClick: (colIndex: number) => void;
  resetGame: () => void;
  startGame: (player1Name: string, player2Name: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rows = 6;
  const cols = 7;

  const [player1, setPlayer1] = useState<PlayerInfo | null>(null);
  const [player2, setPlayer2] = useState<PlayerInfo | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo | null>(null);
  const [board, setBoard] = useState<BoardType>(createEmptyBoard(rows, cols));
  const [moves, setMoves] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerInfo | "draw" | null>(null);
  const [mode, setMode] = useState<"multiplayer" | "vsComputer">("multiplayer");

  const [player1Color, setPlayer1Color] = useState<Player | null>(null);
  const [player2Color, setPlayer2Color] = useState<Player | null>(null);

  const [playerMoveCompleted, setPlayerMoveCompleted] = useState<boolean>(true);

  const defaultPlayer1Color = "red"; // Cor do jogador 1
  const defaultPlayer2Color = "yellow"; // Cor do jogador 2

  const handleClick = (colIndex: number) => {
    if (!currentPlayer || winner || !playerMoveCompleted) return;

    const newRow = getNextEmptyRow(board, colIndex);
    if (newRow === null) {
      alert("Column is full");
      return;
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[newRow][colIndex] = currentPlayer.color;
    setBoard(newBoard);
    setMoves((prevMoves) => prevMoves + 1);

    if (
      moves >= 6 &&
      checkWinner(newBoard, newRow, colIndex, currentPlayer.color)
    ) {
      setTimeout(() => {
        setWinner(currentPlayer);
      }, 100);
      return;
    }

    if (isBoardFull(newBoard)) {
      setTimeout(() => {
        setWinner("draw");
        alert("The game is a draw!");
      }, 100);
      return;
    }

    setPlayerMoveCompleted(true);
    setCurrentPlayer((prev) =>
      prev?.color === player1?.color ? player2 : player1
    );
  };

  useEffect(() => {
    if (mode === "vsComputer" && currentPlayer?.name === player2?.name) {
      setPlayerMoveCompleted(false);

      setTimeout(() => {
        const emptyCols = board[0]
          .map((_, i) => i)
          .filter((i) => getNextEmptyRow(board, i) !== null);

        if (emptyCols.length > 0) {
          const randomCol =
            emptyCols[Math.floor(Math.random() * emptyCols.length)];
          const newRow = getNextEmptyRow(board, randomCol);

          if (newRow !== null) {
            const newBoard = board.map((row) => [...row]);
            newBoard[newRow][randomCol] = player2!.color;
            setBoard(newBoard);
            setMoves((prevMoves) => prevMoves + 1);

            if (checkWinner(newBoard, newRow, randomCol, player2!.color)) {
              setTimeout(() => {
                setWinner(player2);
                // alert(`Player ${player2.name} wins!`);
              }, 100);
              return;
            }

            if (isBoardFull(newBoard)) {
              setTimeout(() => {
                setWinner("draw");
                alert("The game is a draw!");
              }, 100);
              return;
            }

            setCurrentPlayer(player1);
            setPlayerMoveCompleted(true);
          }
        }
      }, 1000);
    }
  }, [currentPlayer, board, mode, player1, player2]);

  const startGame = (player1Name: string, player2Name: string) => {
    setPlayer1Color(defaultPlayer1Color);
    setPlayer2Color(defaultPlayer2Color);

    setPlayer1({
      name: player1Name,
      color: player1Color || defaultPlayer1Color,
    });
    setPlayer2({
      name: player2Name,
      color: player2Color || defaultPlayer2Color,
    });
    setCurrentPlayer({
      name: player1Name,
      color: player1Color || defaultPlayer1Color,
    });
    setBoard(createEmptyBoard(rows, cols));
    setMoves(0);
    setWinner(null);
    setPlayerMoveCompleted(true);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard(rows, cols));
    setCurrentPlayer(player1);
    setMoves(0);
    setWinner(null);
    setPlayerMoveCompleted(true);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        currentPlayer,
        player1,
        player2,
        winner,
        moves,
        mode,
        player1Color,
        player2Color,
        setPlayer1,
        setPlayer2,
        setCurrentPlayer,
        setBoard,
        setWinner,
        setMoves,
        setMode,
        setPlayer1Color,
        setPlayer2Color,
        handleClick,
        resetGame,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
