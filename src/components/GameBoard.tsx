// src/components/GameBoard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../contexts/GameContext";

const GameBoard: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    handleClick,
    resetGame,
    player1,
    player2,
  } = useGame();
  const { t } = useTranslation();

  return (
    <div className="flex space-x-8">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center cursor-pointer"
              onClick={() => {
                handleClick(colIndex);
              }}
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
                      : cell === "black"
                      ? "bg-black"
                      : "bg-purple-500"
                  }`}
                />
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="text-xl font-bold text-black">{t("player_info")}</div>
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
              ? t("it's_a_draw")
              : `${winner.name} ${t("wins")}!`}
          </div>
        )}
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("reset_game")}
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
