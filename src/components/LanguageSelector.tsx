import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageSelect,
}) => {
  const { t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageSelect(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="language-select" className="mb-2 text-black text-lg">
        {t("select_language")}
      </label>
      <select
        id="language-select"
        onChange={handleLanguageChange}
        className="border p-2 bg-white text-black"
      >
        <option value="">-- {t("select_language")} --</option>
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">Russo</option> {/* Adicionar opção para russo */}
      </select>
    </div>
  );
};

export default LanguageSelector;
