import React from "react";
import { useGame } from "../contexts/GameContext";

export default function TicTacToeBoard() {
  const { board, handleClick } = useGame();

  return (
    <div className="grid grid-cols-3 gap-1 mb-4 bg-black">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-12 h-12 bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleClick(rowIndex, colIndex); // Lógica adaptada para Jogo da Velha
            }}
          >
            {cell && (
              <div
                className={`w-8 h-8 rounded-full ${
                  cell === "red"
                    ? "bg-red-500"
                    : cell === "orange"
                    ? "bg-orange-500"
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
  );
}
