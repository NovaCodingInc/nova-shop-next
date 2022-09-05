import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userStateType {
  isLoggedIn: boolean;
  email: string;
  loading : boolean
}

const initialState: userStateType = {
  isLoggedIn: false,
  email: "",
  loading : true
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.email = action.payload;
      state.loading = false
    },
    resetUserInfo: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.loading = false
    },
  },
});

export const { setUserInfo , resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
