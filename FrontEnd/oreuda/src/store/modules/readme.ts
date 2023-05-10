import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AddText {
  titleArr: string;
  descArr: string;
  index: number;
}
interface AddTech {
  name: string;
  color: string;
  index: number;
}
interface AddTechWhole {
  name: string;
  techArray: any;
  index: number;
}
// state type
export interface readmeSlice {
  baekjoonId: string;
  githubId: string;
  githubTheme: string;
  solvedTheme: string;
  mulType: number;
  mulTheme: string;
  mailId: string;
  mailDomain: string;
  blogLink: string;
  notionLink: string;
  // mulTheme: string;
  textTitle: string[];
  textDesc: string[];
  textArr: Array<AddText>;
  newTextTitle: string;
  newTextDesc: string;
  textCnt: number;
  techTitle: string;
  techCnt: number;
  nextComp: number[];
  techPlusArr: Array<AddTech>;
  techPlusModifyArr: Array<AddTech>;
  techArr: boolean[];
  techModifyArr: boolean[];
  techPlusWhole: Array<AddTechWhole>;
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
  mulTheme: "",
  mulType: 0,
  mailId: "",
  mailDomain: "",
  blogLink: "",
  notionLink: "",
  textTitle: [],
  textDesc: [],
  textArr: [],
  newTextTitle: "",
  newTextDesc: "",
  textCnt: 0,
  techTitle: "",
  nextComp: [],
  techPlusArr: [],
  techPlusModifyArr: [],
  techPlusWhole: [],
  techCnt: 0,
  techArr: [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  techModifyArr: [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  componentArr: [true, false, false, false, false, false, false],
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
    // [MUL] MUL 타입 저장
    setMULType(state, action) {
      const temp = state;
      temp.mulType = action.payload;
    },
    // [MUL] MUL 테마 저장
    setMULTheme(state, action) {
      const temp = state;
      temp.mulTheme = action.payload;
    },
    // [contact] contact 메일 아이디 저장
    setMailId(state, action) {
      const temp = state;
      temp.mailId = action.payload;
    },
    // [contact] contact 메일 도메인 저장
    setMailDomain(state, action) {
      const temp = state;
      temp.mailDomain = action.payload;
    },
    // [contact] contact 기술 블로그 링크 저장
    setBlogLink(state, action) {
      const temp = state;
      temp.blogLink = action.payload;
    },
    // [contact] contact 기술 블로그 링크 저장
    setNotionLink(state, action) {
      const temp = state;
      temp.notionLink = action.payload;
    },
    // [addText] addText title 저장
    setTextTitle(state, action) {
      const temp = state;
      temp.newTextTitle = action.payload;
    },
    // [addText] addText desc 저장
    setTextDesc(state, action) {
      const temp = state;
      temp.newTextDesc = action.payload;
    },
    // [addText] addText arr에 push
    setAddText(state, action) {
      const temp = state;

      const data = action.payload;
      data.index = state.textCnt;
      state.textCnt++;

      temp.textArr.push(data);
    },
    // [addText] addText arr에서 제거
    setMinusText(state, action) {
      const newArr = state.textArr.filter(
        (item) => item.index != action.payload
      );

      state.textArr = newArr;
    },
    // [Tech] Tech 기술 제목 저장
    setTechTitle(state, action) {
      const temp = state;
      temp.techTitle = action.payload;
    },
    // [Tech] 선택한 기술 클리어
    setChoiceTechClear(state, action) {
      for (let i = 1; i < state.techArr.length; i++) {
        state.techArr[i] = false;
      }
      state.techPlusArr = [];
    },
    // [Tech] 선택한 기술 매핑
    setChoiceTechIndexChange(state, action) {
      state.techPlusModifyArr = action.payload;
      const data = action.payload;
      data.map((el: any) => {
        state.techModifyArr[el.index] = true;
      });
    },
    // [Tech] 작성한 기술 변경
    setModifyTech(state, action) {
      state.techPlusWhole[action.payload.idx - 1].name = action.payload.data;
      // state.techPlusArr = action.payload;
    },
    // [Tech] 선택한 기술 추가
    setPushTech(state, action) {
      let curr = action.payload.curr;
      let tmp = curr === 0 ? state.techArr : state.techModifyArr;
      if (!tmp[action.payload.index]) {
        if (curr === 0) {
          state.techPlusArr.push(action.payload.data);
          tmp[action.payload.data.index] = true;
        } else {
          state.techPlusModifyArr.push(action.payload.data);
          tmp[action.payload.data.index] = true;

          // whole에서 변경을 해주어야 함
          state.techPlusWhole[curr - 1].techArray = state.techPlusModifyArr;
        }
      }
    },
    // [Tech] 선택한 기술 삭제
    setDeleteTech(state, action) {
      let curr = action.payload.curr;
      let tmp = curr === 0 ? state.techArr : state.techModifyArr;
      if (tmp[action.payload.data.index]) {
        if (curr === 0) {
          state.techPlusArr.map((el: any, index: any) => {
            if (el.index === action.payload.data.index) {
              state.techPlusArr.splice(index, 1);
            }
          });
        } else {
          state.techPlusModifyArr.map((el: any, index: any) => {
            if (el.index === action.payload.data.index) {
              state.techPlusModifyArr.splice(index, 1);
            }
          });
          // whole에서 변경을 해주어야 함
          state.techPlusWhole[curr - 1].techArray = state.techPlusModifyArr;
        }
        tmp[action.payload.data.index] = false;
      }
    },
    // [Tech] TechWhole arr에 push
    setAddTechWhole(state, action) {
      const temp = state;
      const data: any = {};
      data.index = state.techCnt++;
      data.techArray = state.techPlusArr;
      data.name = action.payload.title;

      // console.log(data);
      temp.techPlusWhole.push(data);
    },
    // // [Tech] TechWhole arr에서 제거
    setMinusTechWhole(state, action) {
      const newArr = state.techPlusWhole.filter(
        (item) => item.index != action.payload
      );
      state.techPlusWhole = newArr;
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
      if (state.currComponent != 8) state.nextComp.unshift(state.currComponent);

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
  setMULType,
  setMULTheme,
  setMailId,
  setMailDomain,
  setBlogLink,
  setNotionLink,
  setTextTitle,
  setTextDesc,
  setTechTitle,
  setAddTechWhole,
  setAddText,
  setMinusText,
  setPushTech,
  setModifyTech,
  setChoiceTechIndexChange,
  setMinusTechWhole,
  setDeleteTech,
  setChoiceTechClear,
  setPushComponent,
  setDeleteComponent,
  setNextCompMoving,
  setPrevCompMoving,
} = themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme;
// 리듀서
export default themeSlice.reducer;
