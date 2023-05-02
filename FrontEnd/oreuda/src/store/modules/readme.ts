import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface readmeSlice {
  baekjoonId: string;
  githubId: string;
  githubTheme: string;
  solvedTheme: string;
  nextComp: number[];
  componentArr: boolean[];
  currComponent: number;
  prevComp: number[];
}

// 초기 상태 정의
const initialState: readmeSlice = {
  baekjoonId: "",
  githubId: "",
  githubTheme: "dark",
  solvedTheme: "warm",
  nextComp: [],
  componentArr: [true, false, false, false, false, false, false, false],
  currComponent: 0,
  prevComp: [],
};

const themeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    // [Baekjoon] Baekjoon ID 저장
    setBaekjoonId(state, action) {
      const temp = state;
      temp.baekjoonId = action.payload;
    },
    // [Baekjoon] solved 테마 저장
    setSolvedTheme(state, action) {
      const temp = state;
      temp.solvedTheme = action.payload;
    },
    // [Baekjoon] Baekjoon ID 저장
    setGithubId(state, action) {
      const temp = state;
      temp.githubId = action.payload;
    },
    // [Github] Github 테마 저장
    setGithubTheme(state, action) {
      const temp = state;
      temp.githubTheme = action.payload;
    },
    // [Readme Main] 선택한 컴포넌트 추가
    setPushComponent(state, action) {
      if (!state.componentArr[action.payload]) {
        state.nextComp.push(action.payload);
        state.componentArr[action.payload] = true;
      }
    },
    // [Readme Main] 선택한 컴포넌트 삭제
    setDeleteComponent(state, action) {
      if (state.componentArr[action.payload]) {
        state.nextComp.map((el, index) => {
          if (el === action.payload) {
            state.nextComp.splice(index, 1);
          }
        });
        state.componentArr[action.payload] = false;
      }
    },

    // [All] 다음 버튼 눌렀을 때
    setNextCompMoving(state, action) {
      // 현재 인덱스를 prev배열에 저장
      state.prevComp.push(state.currComponent);

      // next 배열의 첫번째 값 빼고 curr 갱신
      let tmp = state.nextComp.shift();
      if (tmp === undefined) tmp = 8;
      state.currComponent = tmp ? tmp : -1;
    },
    // [All] 이전 버튼을 눌렀을 때,
    setPrevCompMoving(state, action) {
      // 현재 인덱스를 next배열에 저장
      state.nextComp.unshift(state.currComponent);

      let tmp = state.prevComp.pop();
      state.currComponent = tmp || 0;
      // state.nextComp.unshift(tmp ? tmp : -1);
    },
  },
});

// 액션 생성함수
export const {
  setBaekjoonId,
  setSolvedTheme,
  setGithubTheme,
  setGithubId,
  setPushComponent,
  setDeleteComponent,
  setNextCompMoving,
  setPrevCompMoving,
} = themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme;
// 리듀서
export default themeSlice.reducer;
