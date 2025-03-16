import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "defaultUser123",
};

export const userSlice = createSlice({
  name: "userData", // This name is just for Redux DevTools
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;

