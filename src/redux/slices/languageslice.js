import { createSlice } from "@reduxjs/toolkit";

const browserLanguage = navigator.language.split("-")[0]; // detect the browser language

const initialState = {
  language: browserLanguage || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
