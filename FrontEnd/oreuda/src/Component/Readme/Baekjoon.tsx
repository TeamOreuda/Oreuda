"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";
import {
  selectReadme,
  setBaekjoonId,
  setBaekjoonTheme,
  setCurrComponent,
  setIsReadmeMainPage,
  setPrevCompMoving,
  setSolvedTheme,
} from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const bjDesignData: string[] = [
  "dark",
  "radical",
  "merko",
  "gruvbox",
  "tokyonight",
  "onedark",
  "cobalt",
  "synthwave",
  "highcontrast",
  "dracula",
];

const svDesignData: string[] = ["warm", "cold", "dark"];

export default function Baekjoon() {
  const nextCompData = useAppSelector(selectReadme).nextComp;
  const prevCompData = useAppSelector(selectReadme).prevComp;
  console.log(`nextCompData: ${nextCompData}`);
  console.log(`prevCompData: ${prevCompData}`);
  const [id, setId] = useState("");

  const dispatch = useAppDispatch();
  const baekJoonIdData = useAppSelector(selectReadme);
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setBaekjoonId(id));
    }
  };

  const onClickBJTheme = (e: any) => {
    dispatch(setBaekjoonTheme(e.target.value));
  };

  const onClickSVTheme = (e: any) => {
    dispatch(setSolvedTheme(e.target.value));
  };

  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>백준(Baek Joon)</span>
        <p>백준의 티어와 잔디를 보여주는 컴포넌트 입니다.</p>
      </div>
      <div className={st.contentDiv}>
        <input
          type="text"
          placeholder="백준 아이디"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => activeEnter(e)}
        ></input>
        <div className={st.selectBox}>
          {/* <select className={st.selectBJ} onClick={onClickBJTheme}>
            {bjDesignData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select> */}
          <span>테마 설정</span>
          <select className={st.selectSV} onClick={onClickSVTheme}>
            {svDesignData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(setCurrComponent(0));
            dispatch(setPrevCompMoving(0));
            dispatch(setIsReadmeMainPage(true));
          }}
        >
          이전
        </button>
        {/* <button>확인</button> */}
      </div>
    </div>
  );
}
