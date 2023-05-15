"use client";

import { useState } from "react";
import st from "./Github.module.scss";
import {
  selectReadme,
  setBaekjoonId,
  setGithubId,
  setGithubTheme,
  setSolvedTheme,
} from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn";

const svDesignData: string[] = [
  "dark",
  "radical",
  "gruvbox",
  "tokyonight",
  "onedark",
  "cobalt",
];

export default function Github() {
  // const nextComp = useAppSelector(selectReadme).nextComp;
  // const prevComp = useAppSelector(selectReadme).prevComp;
  const githubTheme = useAppSelector(selectReadme).githubTheme;
  const githubId = useAppSelector(selectReadme).githubId;
  const [id, setId] = useState(githubId);

  const dispatch = useAppDispatch();
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setGithubId(id));
    }
  };

  const onClickSVTheme = (e: any) => {
    dispatch(setGithubTheme(e.target.value));
  };

  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>깃헙 스탯(Stats)</span>
        <p>깃헙 스택을 보여주는 컴포넌트 입니다.</p>
      </div>
      <div className={st.contentDiv}>
        {/* <input
          type="text"
          placeholder="깃헙 아이디"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => activeEnter(e)}
          value={id}
        ></input> */}
        <div className={st.selectBox}>
          <span>테마 설정</span>
          <select
            className={st.selectSV}
            onClick={onClickSVTheme}
            defaultValue={githubTheme}
          >
            {svDesignData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
