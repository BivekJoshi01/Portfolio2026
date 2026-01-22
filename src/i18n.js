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
    lng: "np",
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

// import store from "./src/redux/store";

// // Create a function to set the language based on Redux store
// export const setLanguageFromStore = () => {
//   const state = store.getState();
//   const language = state.language.mode;
//   i18n.changeLanguage(language);
// };

// i18n.use(initReactI18next).init({
//   fallbackLng: "EN",
//   lng: store.getState().language.mode,
// });

// export default i18n;
