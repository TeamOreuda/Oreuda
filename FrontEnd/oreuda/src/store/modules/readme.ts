import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface readmeSlice {
  baekjoonId: string;
  baekjoonTheme: string;
  solvedTheme: string;
  isReadmeMainPage: boolean;
  choiceStack: number[];
  componentArr: boolean[];
  currComponent: number;
  nextComp: number[];
  prevComp: number[];
}

// 초기 상태 정의
const initialState: readmeSlice = {
  baekjoonId: "",
  baekjoonTheme: "dark",
  solvedTheme: "warm",
  isReadmeMainPage: true,
  choiceStack: [],
  componentArr: [true, false, false, false, false, false, false, false],
  currComponent: 1,
  nextComp: [],
  prevComp: [],
};

const themeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    // [ALL] 리드미 메인인지 확인
    setIsReadmeMainPage(state, action) {
      const temp = state;
      temp.isReadmeMainPage = action.payload;
    },
    // [Baekjoon] Baekjoon ID 저장
    setBaekjoonId(state, action) {
      const temp = state;
      temp.baekjoonId = action.payload;
    },
    // [Baekjoon] Baekjoon 테마 저장
    setBaekjoonTheme(state, action) {
      const temp = state;
      temp.baekjoonTheme = action.payload;
    },
    // [Baekjoon] solved 테마 저장
    setSolvedTheme(state, action) {
      const temp = state;
      temp.solvedTheme = action.payload;
    },
    // [Readme Main] 선택한 컴포넌트 추가
    setPushComponent(state, action) {
      if (!state.componentArr[action.payload]) {
        state.choiceStack.push(action.payload);
        state.componentArr[action.payload] = true;
      }
    },
    // [Readme Main] 선택한 컴포넌트 삭제
    setDeleteComponent(state, action) {
      if (state.componentArr[action.payload]) {
        state.choiceStack.map((el, index) => {
          if (el === action.payload) {
            state.choiceStack.splice(index, 1);
          }
        });
        state.componentArr[action.payload] = false;
      }
    },
    // 현재 보여주는 컴포넌트 인덱스
    setCurrComponent(state, action) {
      state.currComponent = action.payload;
    },
    // main 페이지에서 다음 버튼 눌렀을 때, nextComp배열 생성
    setCreateNextArr(state, action) {
      state.nextComp = state.choiceStack;
    },
    // 다음 버튼 눌렀을 때, nextComp배열의 앞의 값 하나 빼내서 prev에 넣기
    setNextCompMoving(state, action) {
      let tmp = state.nextComp.shift();
      console.log(tmp);

      setCurrComponent(tmp);
      state.prevComp.push(tmp ? tmp : 0);
    },
    // 이전 버튼을 눌렀을 때,
    setPrevCompMoving(state, action) {
      let tmp = state.prevComp.pop();
      setCurrComponent(tmp);
      state.nextComp.unshift(tmp ? tmp : 0);
    },
  },
});

// 액션 생성함수
export const {
  setBaekjoonId,
  setBaekjoonTheme,
  setSolvedTheme,
  // setComponentList,
  setIsReadmeMainPage,
  setPushComponent,
  setDeleteComponent,
  setCurrComponent,
  setCreateNextArr,
  setNextCompMoving,
  setPrevCompMoving,
} = themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme;
// 리듀서
export default themeSlice.reducer;
