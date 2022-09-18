import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    isLoading : false
};
const laodingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export default laodingSlice.reducer;
export const { endLoading, startLoading } = laodingSlice.actions;
