import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createEmptyBoard,
  checkWinner,
  isBoardFull,
  getNextEmptyRow,
  Player,
  BoardType,
} from "../utils/gameLogic";
import { useTranslation } from "react-i18next";

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
  mode: "multiplayer" | "vsComputer" | null;
  player1Color: Player | null;
  player2Color: Player | null;
  selectedLanguage: string | null;
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
  handleLanguageChange: (language: string) => void;
  handleModeSelect: (mode: "multiplayer" | "vsComputer") => void;
  handleColorSelect: (color: Player, isPlayer1: boolean) => void;
  handlePlayersSubmit: (player1Name: string, player2Name: string) => void; // Novo método
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();

  const rows = 6;
  const cols = 7;

  const [player1, setPlayer1] = useState<PlayerInfo | null>(null);
  const [player2, setPlayer2] = useState<PlayerInfo | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo | null>(null);
  const [board, setBoard] = useState<BoardType>(createEmptyBoard(rows, cols));
  const [moves, setMoves] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerInfo | "draw" | null>(null);
  const [mode, setMode] = useState<"multiplayer" | "vsComputer" | null>(null);
  const [player1Color, setPlayer1Color] = useState<Player | null>(null);
  const [player2Color, setPlayer2Color] = useState<Player | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [playerMoveCompleted, setPlayerMoveCompleted] = useState<boolean>(true);

  const defaultPlayer1Color = "red";
  const defaultPlayer2Color = "yellow";

  const handleLanguageChange = (language: string) => {
    console.log("Language Selected: ", language);
    setSelectedLanguage(language);
  };

  const handleModeSelect = (selectedMode: "multiplayer" | "vsComputer") => {
    console.log("Mode Selected: ", selectedMode);
    setMode(selectedMode);

    if (selectedMode === "vsComputer") {
      handleColorSelect("black", false);
    }
  };

  const handleColorSelect = (color: Player, isPlayer1: boolean) => {
    if (isPlayer1) {
      console.log("Color Player 1: ", color);
      setPlayer1Color(color);
    } else {
      console.log("Color Player 2: ", color);
      setPlayer2Color(color);
    }
  };

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
    setPlayer1({
      name: player1Name,
      color: player1Color || defaultPlayer1Color,
    });

    if (mode === "multiplayer") {
      setPlayer2({
        name: player2Name,
        color: player2Color || defaultPlayer2Color,
      });
    }

    setCurrentPlayer({
      name: player1Name,
      color: player1Color || defaultPlayer1Color,
    });

    setBoard(createEmptyBoard(rows, cols));
    setMoves(0);
    setWinner(null);
    setPlayerMoveCompleted(true);
  };

  const handlePlayersSubmit = (player1Name: string, player2Name: string) => {
    console.log("Player 1 name: ", player1Name);
    console.log("Player 2 name: ", player2Name);

    const selectedPlayer1Color = player1Color || defaultPlayer1Color;
    const selectedPlayer2Color = player2Color || defaultPlayer2Color;

    setPlayer1({
      name: player1Name,
      color: selectedPlayer1Color,
    });

    setPlayer2({
      name: mode === "multiplayer" ? player2Name : t("computer_player_name"),
      color: selectedPlayer2Color,
    });
    setCurrentPlayer({
      name: player1Name,
      color: selectedPlayer1Color,
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
        selectedLanguage,
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
        handleLanguageChange,
        handleModeSelect,
        handleColorSelect,
        handlePlayersSubmit,
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
