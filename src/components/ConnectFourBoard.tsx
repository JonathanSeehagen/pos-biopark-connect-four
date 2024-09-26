// src/components/ConnectFourBoard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../contexts/GameContext";

const ConnectFourBoard: React.FC = () => {
  const { board, handleClick } = useGame();

  return (
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
  );
};

export default ConnectFourBoard;
