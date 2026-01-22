import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("i18nextLng") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === "en" ? "np" : "en";
      localStorage.setItem("i18nextLng", state.lang);
    },
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("i18nextLng", state.lang);
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
