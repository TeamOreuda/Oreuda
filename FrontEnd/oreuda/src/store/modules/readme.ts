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
  techPlusArr: Array<AddTech>;
  techPlusModifyArr: Array<AddTech>;
  techArr: boolean[];
  techModifyArr: boolean[];
  techPlusWhole: Array<AddTechWhole>;
  componentArr: boolean[];
  currComponent: number;
  nextComp: number[];
  prevComp: number[];
  nPrevComp: any;
  isSaveReadme: boolean;
}

// 초기 상태 정의
const initialState: readmeSlice = {
  baekjoonId: "",
  solvedTheme: "warm",

  githubId: "",
  githubTheme: "dark",

  mulTheme: "dark",
  mulType: 0,

  // curr
  techPlusWhole: [],

  techCnt: 0,
  techPlusArr: [],
  techPlusModifyArr: [],
  techTitle: "",
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

  mailId: "",
  mailDomain: "naver.com",
  blogLink: "",
  notionLink: "",

  textArr: [],
  textCnt: 0,
  textTitle: [],
  textDesc: [],
  newTextTitle: "",
  newTextDesc: "",

  componentArr: [true, false, false, false, false, false, false, false],
  currComponent: 0,
  prevComp: [],
  nextComp: [],
  nPrevComp: [],
  isSaveReadme: false,
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
    // [Github] Github ID 저장
    setGithubId(state, action) {
      const temp = state;
      temp.githubId = action.payload;
    },
    // [Github] Github 테마 저장
    setGithubTheme(state, action) {
      state.githubTheme = action.payload;
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
      state.blogLink = action.payload;
    },
    // [contact] contact 기술 블로그 링크 저장
    setNotionLink(state, action) {
      state.notionLink = action.payload;
    },
    // [addText] addText title 저장
    setTextTitle(state, action) {
      state.newTextTitle = action.payload;
    },
    // [addText] addText desc 저장
    setTextDesc(state, action) {
      state.newTextDesc = action.payload;
    },
    // [Add Text] 선택한 덩어리 title 변경
    setModifyTitle(state, action) {
      state.textArr[action.payload.idx - 1].titleArr = action.payload.data;
    },
    // [Add Text] 선택한 덩어리 desc 변경
    setModifyDesc(state, action) {
      state.textArr[action.payload.idx - 1].descArr = action.payload.data;
    },
    // [addText] addText arr에 push
    setAddText(state, action) {
      const data = action.payload;
      data.index = state.textCnt;
      state.textCnt++;

      state.textArr.push(data);
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
    // [Tech] 선택한 덩어리 기술 선택
    setChoiceTechIndexChange(state, action) {
      // [curr != 0] 추가한 기술이 담기는 임시배열
      state.techPlusModifyArr = action.payload;
      const data = action.payload;
      data.map((el: any) => {
        state.techModifyArr[el.index] = true;
      });
    },
    // [Tech] 선택한 덩어리 제목 변경
    setModifyTech(state, action) {
      state.techPlusWhole[action.payload.idx - 1].name = action.payload.data;
      // state.techPlusArr = action.payload;
    },
    // [Tech] select 박스 선택시 기술 추가 메서드
    setPushTech(state, action) {
      let curr = action.payload.curr;
      let tmp = curr === 0 ? state.techArr : state.techModifyArr;

      if (!tmp[action.payload.data.index]) {
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

              // whole에서 변경을 해주어야 함
              state.techPlusWhole[curr - 1].techArray = state.techPlusModifyArr;
            }
          });
        }
        tmp[action.payload.data.index] = false;
      }
    },
    // [Tech] TechWhole arr에 push
    setAddTechWhole(state, action) {
      // data에 덩어리 인덱스, 덩어리 테크배열, 덩어리 이름, 덩어리 테크boolean배열 담음
      const temp = state;
      const data: any = {};
      data.index = state.techCnt++;
      data.techArray = state.techPlusArr;
      data.name = action.payload.title;
      data.tmp = state.techArr;

      // 추가버튼을 눌렀을 때,
      // techArr 초기화
      state.techArr = [
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
      ];
      // tech 전체를 담당하는 techPlusWhole에 넣어줌
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
          // console.log(typeof el, typeof action.payload);

          if (Number(el) === action.payload) {
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
    // [Sorting] 리드미 컴포넌트 이동(prevArr 변경)
    setMovingComponent(state, action) {
      const start = action.payload.start;
      const end = action.payload.end;

      const arr: any = state.prevComp;
      state.nPrevComp[start] = state.nPrevComp.splice(
        end,
        1,
        state.nPrevComp[start]
      )[0];

      // const arr2: any = state.componentArr;
      // state.componentArr.splice(end, 1, state.componentArr[start]);
    },
    // 삭제해도 된당.
    setPrevCompChange(state, action) {
      // console.log(action.payload);
      // state.prevComp = action.payload;
    },
    // ㅇㅇㅇ
    setNewPrevComp(state, action) {
      // console.log(action.payload);
      state.nPrevComp = action.payload;
    },
    // 리드미 store값 초기화
    setClearReadmeStore(state, action) {
      state.baekjoonId = "";
      state.solvedTheme = "warm";
      state.githubTheme = "dark";
      state.mulTheme = "dark";
      state.mulType = 0;
      state.mailId = "";
      state.mailDomain = "naver.com";
      state.blogLink = "";
      state.notionLink = "";
      state.textTitle = [];
      state.textDesc = [];
      state.textArr = [];
      state.newTextTitle = "";
      state.newTextDesc = "";
      state.textCnt = 0;
      state.techTitle = "";
      state.techPlusArr = [];
      state.techPlusModifyArr = [];
      state.techPlusWhole = [];
      state.techCnt = 0;
      state.techArr = [
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
      ];
      state.techModifyArr = [
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
      ];
      state.componentArr = [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      state.currComponent = 0;
      state.prevComp = [];
      state.nextComp = [];
      state.nPrevComp = [];
    },
    // 불러온 데이터 활용해 store 변경
    setLoadDataMapping(state, action) {
      const data = action.payload;
      // console.log();

      const techWholeTmpArr: any = [];
      const textWholeTmpArr: any = [];
      let ttmp = 0;
      let techFlag = false;
      let textFlag = false;
      data.map((el: any, index: any) => {
        let tmp = el.readmeType;
        if (tmp === "BOJ") {
          state.baekjoonId = el.bojValue;
          state.solvedTheme = el.bojTheme;
          state.componentArr[1] = true;
          state.nextComp.push(1);
        } else if (tmp === "GIT") {
          state.githubTheme = el.gitTheme;
          state.githubId = el.gitValue;
          state.componentArr[2] = true;
          state.nextComp.push(2);
        } else if (tmp === "LANGUAGE") {
          state.mulTheme = el.languageTheme;
          state.mulType = el.languageType;
          state.githubId = el.languageValue;
          state.componentArr[3] = true;
          state.nextComp.push(3);
        } else if (tmp === "TECH") {
          const obj: any = {};
          obj.name = el.techTitle;
          obj.techArray = el.techStack;
          obj.index = ttmp++;
          techWholeTmpArr.push(obj);
          state.componentArr[4] = true;
          if (!techFlag) {
            state.nextComp.push(4);
            techFlag = true;
          }
        } else if (tmp === "CONTACT") {
          const mail = el.mailLink.split("@");
          state.mailId = mail[0];
          state.mailDomain = mail[1];
          state.blogLink = el.blogLink;
          state.notionLink = el.notionLink;
          state.componentArr[5] = true;
          state.nextComp.push(5);
        } else if (tmp === "PLANT") {
          state.githubId = el.oreuValue;
          state.componentArr[6] = true;
          state.nextComp.push(6);
        } else if (tmp === "WRITING") {
          const obj: any = {};
          // console.log(el);

          obj.titleArr = el.writingTitle;
          obj.descArr = el.writingContents;
          obj.index = state.textCnt++;
          textWholeTmpArr.push(obj);
          state.componentArr[7] = true;
          if (!textFlag) {
            state.nextComp.push(7);
            textFlag = true;
          }
        }
      });
      state.techPlusWhole = techWholeTmpArr;
      state.textArr = textWholeTmpArr;
    },
    // DB에 리드미가 저장되어 불러올 수 있는지 없는지 유무값 저장
    setIsSaveReadme(state, action) {
      state.isSaveReadme = action.payload;
    },
    // [Main] 리드미 메인에서 모두 선택
    setAllCheckComp(state, action) {
      // 이전에 선택한 리스트는 초기화한 뒤
      state.componentArr = [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      state.nextComp = [];

      // 모두 선택
      state.componentArr.map((el, index) => {
        if (index !== 0) {
          state.componentArr[index] = true;
          state.nextComp.push(index);
        }
      });
      // console.log(state.componentArr);
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
  setModifyTitle,
  setModifyDesc,
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
  setMovingComponent,
  setPrevCompChange,
  setNewPrevComp,
  setClearReadmeStore,
  setLoadDataMapping,
  setIsSaveReadme,
  setAllCheckComp,
} = themeSlice.actions;
export const selectReadme = (state: RootState) => state.readme;
// 리듀서
export default themeSlice.reducer;
