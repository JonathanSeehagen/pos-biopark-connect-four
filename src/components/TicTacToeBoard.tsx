// src/components/TicTacToeBoard.tsx
import React from "react";
import { useGame } from "../contexts/GameContext";

const TicTacToeBoard: React.FC = () => {
  const { board, handleClick } = useGame();

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleClick(colIndex + rowIndex * 3); // Lógica adaptada para Jogo da Velha
            }}
          >
            {cell && (
              <div
                className={`w-8 h-8 flex items-center justify-center font-bold text-3xl`}
              >
                {cell}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TicTacToeBoard;
