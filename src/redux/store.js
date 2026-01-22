import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Reducer/themeSlice";
import languageReducer from "./Reducer/languageSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: languageReducer,
  },
});

export default store;

