// src/components/GameBoard.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../contexts/GameContext";
import ConnectFourBoard from "./ConnectFourBoard";
import TicTacToeBoard from "./TicTacToeBoard";
import Confetti from "react-confetti";

export default function GameBoard() {
  const { selectedGame, currentPlayer, winner, resetGame, player1, player2 } =
    useGame();
  const { t } = useTranslation();

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (winner && winner !== "draw") {
      setConfetti(true);
      // Para esconder os confetes após um tempo
      const timer = setTimeout(() => {
        setConfetti(false);
      }, 6000); // Confetes aparecem por 5 segundos

      return () => clearTimeout(timer); // Limpar o timer se o componente desmontar
    }
  }, [winner]);

  return (
    <div className="flex space-x-20 justify-center items-center">
      <div>
        {selectedGame === "Connect Four" && <ConnectFourBoard />}
        {selectedGame === "Tic Tac Toe" && <TicTacToeBoard />}
      </div>

      <div>
        <div className="flex w-80 flex-col space-y-4   bg-gray-100 p-5 rounded-xl shadow-lg border-gray-300 border-1">
          {confetti && <Confetti />}

          {winner ? (
            <div className="text-2xl font-bold text-black mb-2 text-center">
              {winner === "draw"
                ? t("draw_message")
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
}
