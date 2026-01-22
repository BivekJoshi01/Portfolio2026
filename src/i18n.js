import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./language/en/translation.json";
import npTranslation from "./language/np/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: localStorage.getItem("i18nextLng") || "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      np: {
        translation: npTranslation,
      },
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
