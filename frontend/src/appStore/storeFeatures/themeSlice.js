import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

export const themeSlice = createSlice({
  name: "theme", // This name is just for Redux DevTools
  initialState,
  reducers: {
    switchTheme: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
