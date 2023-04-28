import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface readmeSlice {
  baekjoonId: string;
  baekjoonTheme: string;
  solvedTheme: string;
}

// 초기 상태 정의
const initialState: readmeSlice = {
  baekjoonId: "",
  baekjoonTheme: "dark",
  solvedTheme: "warm",
};

const themeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    setBaekjoonId(state, action) {
      const temp = state;
      temp.baekjoonId = action.payload;
    },
    setBaekjoonTheme(state, action) {
      const temp = state;
      temp.baekjoonTheme = action.payload;
    },
    setSolvedTheme(state, action) {
      const temp = state;
      temp.solvedTheme = action.payload;
    },
  },
});

// 액션 생성함수
export const { setBaekjoonId, setBaekjoonTheme, setSolvedTheme } =
  themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme;
// 리듀서
export default themeSlice.reducer;
