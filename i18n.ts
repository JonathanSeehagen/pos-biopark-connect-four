import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./public/locales/en/translation.json";
import pt from "./public/locales/pt/translation.json";
import es from "./public/locales/es/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
  },
  lng: "pt", // Idioma padrão
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
