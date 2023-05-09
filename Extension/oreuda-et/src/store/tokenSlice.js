import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: ""
};

export const tokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveToken } = tokenSlice.actions;

export default tokenSlice.reducer;
