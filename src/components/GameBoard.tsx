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
    <div className="flex space-x-20 justify-center items-center">
      <div>
        {selectedGame === "Connect Four" && <ConnectFourBoard />}
        {selectedGame === "Tic Tac Toe" && <TicTacToeBoard />}
      </div>

      <div>
        <div className="flex w-80 flex-col space-y-4   bg-gray-100 p-5 rounded-xl shadow-lg border-gray-300 border-1">
          {winner ? (
            <div className="text-2xl font-bold text-black mb-2 text-center">
              {winner === "draw"
                ? t("it's_a_draw")
                : `${winner.name} ${t("wins")}!`}
            </div>
          ) : (
            <>
              <div className="text-xl font-bold text-black">
                {t("player_info")}
              </div>
              <div className="text-md text-black">
                <span className="font-bold" style={{ color: player1?.color }}>
                  {player1?.name}
                </span>{" "}
                🆚{" "}
                <span className="font-bold" style={{ color: player2?.color }}>
                  {player2?.name}
                </span>
              </div>

              <div className="text-xl font-bold text-black mt-4">
                {t("current_player")}:{" "}
                <span
                  className="text-lg font-bold"
                  style={{ color: currentPlayer?.color }}
                >
                  {currentPlayer?.name}
                </span>
              </div>
            </>
          )}
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("reset_game")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
