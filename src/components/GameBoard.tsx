// src/components/GameBoard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../contexts/GameContext";
import ConnectFourBoard from "./ConnectFourBoard";
import TicTacToeBoard from "./TicTacToeBoard";

const GameBoard: React.FC = () => {
  const { selectedGame, currentPlayer, winner, resetGame, player1, player2 } =
    useGame();
  const { t } = useTranslation();

  return (
    <div className="flex space-x-8">
      {selectedGame === "Connect Four" && <ConnectFourBoard />}
      {selectedGame === "Tic Tac Toe" && <TicTacToeBoard />}

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
