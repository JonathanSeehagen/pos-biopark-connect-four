import React from "react";
import { useTranslation } from "react-i18next";

interface GameSelectProps {
  onGameSelect: (game: "Connect Four" | "Tic Tac Toe") => void;
}

const GameSelect: React.FC<GameSelectProps> = ({ onGameSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4 bg-slate-300 p-4">
      <h2 className="text-2xl font-bold text-black">{`${t(
        "select_game"
      )}:`}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => onGameSelect("Connect Four")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("connect_four")}
        </button>
        <button
          onClick={() => onGameSelect("Tic Tac Toe")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("tic_tac_toe")}
        </button>
      </div>
    </div>
  );
};

export default GameSelect;
