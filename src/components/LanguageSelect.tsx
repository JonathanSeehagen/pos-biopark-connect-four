// src/components/LanguageSelect.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSelectProps {
  handleLanguageChange: (lang: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  handleLanguageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4 bg-slate-300 p-4">
      <h2 className="text-2xl font-bold text-black">{`${t(
        "select_language"
      )}:`}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleLanguageChange("en")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("english")}
        </button>
        <button
          onClick={() => handleLanguageChange("pt")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("portuguese")}
        </button>
        <button
          onClick={() => handleLanguageChange("es")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("spanish")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;
