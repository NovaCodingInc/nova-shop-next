import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userStateType {
  isLoggedIn: boolean;
  email: string;
  loading: boolean;
  token: string;
}

type payloadType = {
  token: string;
  email: string;
};

const initialState: userStateType = {
  isLoggedIn: false,
  email: "",
  loading: true,
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<payloadType>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.loading = false;
      state.token = action.payload.token;
    },
    resetUserInfo: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.loading = false;
      state.token = "";
    },
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
