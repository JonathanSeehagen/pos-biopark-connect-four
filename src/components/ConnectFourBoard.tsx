// src/components/ConnectFourBoard.tsx
import React from "react";
import { useGame } from "../contexts/GameContext";

export default function ConnectFourBoard() {
  const { board, handleClick } = useGame();

  return (
    <div className="grid grid-cols-7 gap-2 mb-4 bg-blue-600 rounded-xl p-4 shadow-xl">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-12 h-12 bg-gray-100 flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => {
              handleClick(0, colIndex);
            }}
          >
            {cell && (
              <div
                className={`w-12 h-12 rounded-full shadow-lg ${
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
