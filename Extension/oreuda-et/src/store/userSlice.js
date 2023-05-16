import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: "",
  commitCnt: 0,
  repositoryCnt: 0,
  streakMax: 0,
  mainLanguage: "",
};

export const userSlice = createSlice({
  name: "userSave",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.nickname = action.payload.nickname;
      state.commitCnt = action.payload.commitCnt;
      state.repositoryCnt = action.payload.repositoryCnt;
      state.streakMax = action.payload.streakMax;
      state.mainLanguage = action.payload.mainLanguage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userInfo } = userSlice.actions;

export default userSlice.reducer;
