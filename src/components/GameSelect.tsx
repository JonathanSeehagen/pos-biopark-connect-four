import React from "react";
import { useTranslation } from "react-i18next";

interface GameSelectProps {
  onGameSelect: (game: "Connect Four" | "Tic Tac Toe") => void;
}

export default function GameSelect({ onGameSelect }: GameSelectProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4  bg-gray-100 p-5 rounded-xl shadow-lg border-gray-300 border-1">
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
}
