import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../storeFeatures/userSlice";
import themeReducer from "../storeFeatures/themeSlice"

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    // This key defines how we access it in `useSelector` and not the key "name" inside the userSlice!
    themeSlice: themeReducer,
  },
});

