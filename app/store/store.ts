import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import basketReducer from "../features/basketSlice";
import loadingReducer from "../features/mainLoading";
export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    isMainLoading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
