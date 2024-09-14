// src/contexts/GameContext.tsx
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

  const generateGameStateJSON = () => {
    const gameState = {
      board,
      currentPlayer: currentPlayer ? currentPlayer.name : null,
      player1: player1 ? { name: player1.name, color: player1.color } : null,
      player2: player2 ? { name: player2.name, color: player2.color } : null,
      winner,
      moves,
    };

    console.log("Game State JSON:", JSON.stringify(gameState, null, 2));
  };

  const handleClick = (colIndex: number) => {
    if (!currentPlayer || winner) return;

    const newRow = getNextEmptyRow(board, colIndex);
    if (newRow === null) {
      alert("Column is full");
      return;
    }

    const newBoard = board.map((row) => [...row]);
    newBoard[newRow][colIndex] = currentPlayer.color;
    setBoard(newBoard);
    setMoves((prevMoves) => prevMoves + 1);

    // Atualize o estado do vencedor antes de exibir a mensagem
    if (
      moves >= 6 &&
      checkWinner(newBoard, newRow, colIndex, currentPlayer.color)
    ) {
      setTimeout(() => {
        setWinner(currentPlayer);
        generateGameStateJSON();
        //alert(`Player ${currentPlayer.name} wins!`);
      }, 100);
      return;
    }

    if (isBoardFull(newBoard)) {
      setTimeout(() => {
        setWinner("draw");
        generateGameStateJSON();
        alert("The game is a draw!");
      }, 100);
      return;
    }

    // Alternar o jogador atual
    setCurrentPlayer((prev) =>
      prev?.color === player1?.color ? player2 : player1
    );

    // Se estiver no modo "vsComputer", faça o movimento do computador
    if (mode === "vsComputer" && currentPlayer === player1) {
      setTimeout(() => {
        const emptyCols = board[0]
          .map((_, i) => i)
          .filter((i) => getNextEmptyRow(board, i) !== null);
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
              generateGameStateJSON();
              alert(`Player ${player2.name} wins!`);
            }, 100);
            return;
          }

          if (isBoardFull(newBoard)) {
            setTimeout(() => {
              setWinner("draw");
              generateGameStateJSON();
              alert("The game is a draw!");
            }, 100);
            return;
          }

          setCurrentPlayer(player1);
        }
      }, 1000);
    }
  };

  const startGame = (player1Name: string, player2Name: string) => {
    if (player1Color && player2Color) {
      setPlayer1({ name: player1Name, color: player1Color });
      setPlayer2({ name: player2Name, color: player2Color });
      setCurrentPlayer({ name: player1Name, color: player1Color });
      setBoard(createEmptyBoard(rows, cols));
      setMoves(0);
      setWinner(null);
    } else {
      alert("Select colors for both players");
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard(rows, cols));
    setCurrentPlayer(player1);
    setMoves(0);
    setWinner(null);
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
