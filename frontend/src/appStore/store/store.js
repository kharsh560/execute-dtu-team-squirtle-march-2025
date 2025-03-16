import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../storeFeatures/authSlice";
import themeReducer from "../storeFeatures/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    // This key defines how we access it in `useSelector` and not the key "name" inside the userSlice!
    themeSlice: themeReducer,
  },
});
