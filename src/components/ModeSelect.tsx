// src/components/ModeSelect.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface ModeSelectProps {
  handleModeSelect: (mode: "multiplayer" | "vsComputer") => void;
}

const ModeSelect: React.FC<ModeSelectProps> = ({ handleModeSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4 bg-gray-100 p-5 rounded-xl shadow-lg border-gray-300 border-1">
      <h2 className="text-2xl font-bold text-black">{t("select_mode")}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleModeSelect("multiplayer")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("multiplayer")}
        </button>
        <button
          onClick={() => handleModeSelect("vsComputer")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("vs_computer")}
        </button>
      </div>
    </div>
  );
};

export default ModeSelect;
