import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "np",
    resources: {
      en: {
        translation: {
          greeting: "Welcome to my showcase",
        },
      },
      np: {
        translation: {
          greeting: "नमस्ते mero showcase",
        },
      },
    },
  });
