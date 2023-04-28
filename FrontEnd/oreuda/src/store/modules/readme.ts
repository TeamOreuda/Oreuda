import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface readmeSlice {
  baekjoonId: string;
}

// 초기 상태 정의
const initialState: readmeSlice = { baekjoonId: "" };

const themeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    setBaekjoonId(state, action) {
      const temp = state;
      temp.baekjoonId = action.payload;
    },
  },
});

// 액션 생성함수
export const { setBaekjoonId } = themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme.baekjoonId;
// 리듀서
export default themeSlice.reducer;
