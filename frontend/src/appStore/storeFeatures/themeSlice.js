import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme", // This name is just for Redux DevTools
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    // Keep switchTheme as an alias for backward compatibility
    switchTheme: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme, switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
