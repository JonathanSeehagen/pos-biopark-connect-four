import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createEmptyBoard,
  isBoardFull,
  getNextEmptyRow,
  Player,
  BoardType,
  checkConnectFourWinner,
  checkTicTacToeWinner,
} from "../utils/gameLogic"; // Ajuste conforme necessário
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

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
  handleClick: (rowIndex: number, colIndex: number) => void;
  resetGame: () => void;
  startGame: (player1Name: string, player2Name: string) => void;
  handleLanguageChange: (language: string) => void;
  handleModeSelect: (mode: "multiplayer" | "vsComputer") => void;
  handleColorSelect: (color: Player, isPlayer1: boolean) => void;
  selectedGame: "Connect Four" | "Tic Tac Toe" | null;
  setSelectedGame: (game: "Connect Four" | "Tic Tac Toe") => void;
  handlePlayersSubmit: (player1Name: string, player2Name: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();

  const [player1, setPlayer1] = useState<PlayerInfo | null>(null);
  const [player2, setPlayer2] = useState<PlayerInfo | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerInfo | "draw" | null>(null);
  const [mode, setMode] = useState<"multiplayer" | "vsComputer" | null>(null);
  const [player1Color, setPlayer1Color] = useState<Player | null>(null);
  const [player2Color, setPlayer2Color] = useState<Player | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<
    "Connect Four" | "Tic Tac Toe" | null
  >(null);
  const [board, setBoard] = useState<BoardType>(createEmptyBoard(6, 7)); // Inicializa o board
  const [playerMoveCompleted, setPlayerMoveCompleted] = useState<boolean>(true);

  const defaultPlayer1Color = "red";
  const defaultPlayer2Color = "orange";

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language); // Alterar o idioma dinamicamente
  };

  const handleModeSelect = (selectedMode: "multiplayer" | "vsComputer") => {
    setMode(selectedMode);
    if (selectedMode === "vsComputer") {
      handleColorSelect("black", false);
    }
  };

  const handleColorSelect = (color: Player, isPlayer1: boolean) => {
    if (isPlayer1) {
      setPlayer1Color(color);
    } else {
      setPlayer2Color(color);
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (!currentPlayer || winner) return;

    // Verifica se o jogo é Connect Four ou Tic Tac Toe

    // Verifica vencedor baseado no jogo selecionado
    if (selectedGame === "Connect Four") {
      // --- Lógica Connect Four (igual à anterior) ---
      const newRow = getNextEmptyRow(board, colIndex);

      if (newRow === null) {
        return;
      }

      const newBoard = board.map((row) => [...row]);
      newBoard[newRow][colIndex] = currentPlayer.color;
      setBoard(newBoard);
      setMoves((prevMoves) => prevMoves + 1);

      // Verifica o vencedor para Connect Four
      if (
        moves >= 6 &&
        checkConnectFourWinner(newBoard, newRow, colIndex, currentPlayer.color)
      ) {
        setWinner(currentPlayer);
      }

      if (isBoardFull(newBoard)) {
        setWinner("draw");
      }
    } else if (selectedGame === "Tic Tac Toe") {
      if (board[rowIndex][colIndex] !== null) {
        return;
      }

      const newBoard = board.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = currentPlayer.color;
      setBoard(newBoard);
      setMoves((prevMoves) => prevMoves + 1);

      // Verifica o vencedor para Tic Tac Toe
      if (
        moves >= 2 &&
        checkTicTacToeWinner(newBoard, rowIndex, colIndex, currentPlayer.color)
      ) {
        setWinner(currentPlayer);
      }

      if (isBoardFull(newBoard)) {
        setWinner("draw");
      }
    }

    setPlayerMoveCompleted(true);
    setCurrentPlayer((prev) =>
      prev?.color === player1?.color ? player2 : player1
    );
  };

  useEffect(() => {
    if (!player1 || !player2) {
      return;
    }

    if (winner) {
      return;
    }

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

            // Verifica vencedor baseado no jogo selecionado
            if (selectedGame === "Connect Four") {
              if (
                moves >= 6 &&
                checkConnectFourWinner(
                  newBoard,
                  newRow,
                  randomCol,
                  player2!.color
                )
              ) {
                setWinner(currentPlayer);
              }
            } else if (selectedGame === "Tic Tac Toe") {
              if (
                moves >= 2 &&
                checkTicTacToeWinner(
                  newBoard,
                  newRow,
                  randomCol,
                  player2!.color
                )
              ) {
                setWinner(currentPlayer);
              }
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
  }, [currentPlayer, board, mode, player1, player2, selectedGame, moves]);

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
    } else {
      setPlayer2({
        name: t("computer_player_name"),
        color: "black",
      });
    }

    setCurrentPlayer({
      name: player1Name,
      color: player1Color || defaultPlayer1Color,
    });

    // Recria o tabuleiro com base no jogo selecionado
    if (selectedGame === "Connect Four") {
      setBoard(createEmptyBoard(6, 7));
    } else if (selectedGame === "Tic Tac Toe") {
      setBoard(createEmptyBoard(3, 3)); // Tabuleiro para Jogo da Velha
    }

    setMoves(0);
    setWinner(null);
    setPlayerMoveCompleted(true);
  };

  const handlePlayersSubmit = (player1Name: string, player2Name: string) => {
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
    //setBoard(createEmptyBoard(rows, cols));
    setMoves(0);
    setWinner(null);
    setPlayerMoveCompleted(true);
  };

  const resetGame = () => {
    // Reseta o tabuleiro e o estado do jogo
    if (selectedGame === "Connect Four") {
      setBoard(createEmptyBoard(6, 7));
    } else if (selectedGame === "Tic Tac Toe") {
      setBoard(createEmptyBoard(3, 3));
    }
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
        selectedGame,
        setSelectedGame,
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
