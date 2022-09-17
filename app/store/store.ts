import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import basketReducer from "../features/basketSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
