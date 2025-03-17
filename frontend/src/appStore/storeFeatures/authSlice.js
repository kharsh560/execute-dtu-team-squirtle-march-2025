import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  userCredits: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.userCredits = null;
    },
    updateCredits: (state, action) => {
      state.userCredits = action.payload;
    }
  },
});

export const { login, logout, updateCredits } = authSlice.actions;

export default authSlice.reducer;
