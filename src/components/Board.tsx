// src/components/Board.tsx
import React, { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import { useTranslation } from "react-i18next";

const Board: React.FC = () => {
  const {
    board,
    player1,
    player2,
    currentPlayer,
    winner,
    handleClick,
    resetGame,
    setPlayer1Color,
    setPlayer2Color,
    startGame,
  } = useGame();
  const { t, i18n } = useTranslation();

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [showPlayerSetup, setShowPlayerSetup] = useState(true);
  const [showLanguageSetup, setShowLanguageSetup] = useState(true);

  const [player1Color, setPlayer1ColorState] = useState("");
  const [player2Color, setPlayer2ColorState] = useState("");

  useEffect(() => {
    if (player1) setPlayer1ColorState(player1.color);
    if (player2) setPlayer2ColorState(player2.color);
  }, [player1, player2]);

  const handleColorSelect = (color: string, isPlayer1: boolean) => {
    if (isPlayer1) {
      setPlayer1ColorState(color);
      setPlayer1Color(color as any);
    } else {
      setPlayer2ColorState(color);
      setPlayer2Color(color as any);
    }
  };

  const handleSubmitPlayers = (e: React.FormEvent) => {
    e.preventDefault();
    startGame(player1Name, player2Name);
    setShowPlayerSetup(false);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageSetup(false);
  };

  const saveGameState = () => {
    const gameState = {
      board,
      player1: {
        name: player1?.name,
        color: player1?.color,
      },
      player2: {
        name: player2?.name,
        color: player2?.color,
      },
      currentPlayer: currentPlayer?.name,
      winner: winner
        ? winner === "draw"
          ? "draw"
          : { name: winner.name, color: winner.color }
        : null,
    };

    // Converte o estado do jogo para JSON
    const gameStateJSON = JSON.stringify(gameState, null, 2);

    // Salva o JSON em um arquivo (ou faz outra coisa com ele, como enviar para um servidor)
    console.log("Game State JSON:", gameStateJSON);
  };

  useEffect(() => {
    saveGameState();
  }, [board, currentPlayer, winner]);

  return (
    <div className="flex flex-col items-center">
      {showLanguageSetup ? (
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-black">
            {`${t("select_language")}:`}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleLanguageChange("en")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {t("english")}
            </button>
            <button
              onClick={() => handleLanguageChange("pt")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {t("portuguese")}
            </button>
            <button
              onClick={() => handleLanguageChange("ru")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {t("russian")}
            </button>
            <button
              onClick={() => handleLanguageChange("es")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {t("spanish")}
            </button>
          </div>
        </div>
      ) : showPlayerSetup ? (
        <form
          onSubmit={handleSubmitPlayers}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="player1Name" className="mb-2 text-black">
              {t("player1_name")}
            </label>
            <input
              type="text"
              id="player1Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="border p-2 text-black bg-white"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="player1Color" className="mb-2 text-black">
              {t("player1_color")}
            </label>
            <div className="flex space-x-2">
              {["red", "yellow", "blue", "green", "purple"].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${
                    color === player1Color ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color, true)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="player2Name" className="mb-2 text-black">
              {t("player2_name")}
            </label>
            <input
              type="text"
              id="player2Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="border p-2 text-black bg-white"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="player2Color" className="mb-2 text-black">
              {t("player2_color")}
            </label>
            <div className="flex space-x-2">
              {["red", "yellow", "blue", "green", "purple"].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${
                    color === player2Color ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color, false)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("start_game")}
          </button>
        </form>
      ) : (
        <div className="flex space-x-8">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center cursor-pointer"
                  onClick={() => handleClick(colIndex)}
                >
                  {cell && (
                    <div
                      className={`w-8 h-8 rounded-full ${
                        cell === "red"
                          ? "bg-red-500"
                          : cell === "yellow"
                          ? "bg-yellow-500"
                          : cell === "blue"
                          ? "bg-blue-500"
                          : cell === "green"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    />
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <div className="text-xl font-bold text-black">
              {t("player_info")}
            </div>
            <div className="text-lg text-black">
              <span className="font-bold">{player1?.name}</span>:{" "}
              <span style={{ color: player1?.color }}>
                {t(`colors.${player1?.color}`)}
              </span>
            </div>
            <div className="text-lg text-black">
              <span className="font-bold">{player2?.name}</span>:{" "}
              <span style={{ color: player2?.color }}>
                {t(`colors.${player2?.color}`)}
              </span>
            </div>
            <div className="text-xl font-bold text-black mt-4">
              {t("current_player")}:
              <div
                className="text-lg font-bold"
                style={{ color: currentPlayer?.color }}
              >
                {currentPlayer?.name}
              </div>
            </div>
            {winner && (
              <div className="text-2xl font-bold text-black mb-4">
                {winner === "draw"
                  ? t("draw_message")
                  : t("winner_message", {
                      name: winner.name,
                      color: t(`colors.${winner.color}`),
                    })}
              </div>
            )}
            {winner && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {t("reset_game")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
