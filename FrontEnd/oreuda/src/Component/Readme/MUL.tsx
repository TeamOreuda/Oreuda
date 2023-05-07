"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { selectReadme, setMULTheme, setMULType } from "@/store/modules/readme";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";

const MULThemeData: string[] = [
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

export default function MUL() {
  const mulTheme = useAppSelector(selectReadme).mulTheme;

  const [checkedIdx, setCheckedIdx] = useState(1);
  const dispatch = useAppDispatch();
  const onChangeRadioBtn = (e: any) => {
    setCheckedIdx(e.target.value);
    dispatch(setMULType(e.target.value));
  };

  const onClickSVTheme = (e: any) => {
    dispatch(setMULTheme(e.target.value));
  };
  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>주 사용 언어(MUL)</span>
        <p>주로 많이 사용한 언어들 순으로 정렬해서 보여줍니다.</p>
      </div>
      <div className={st.radioBtnDiv}>
        <label className={checkedIdx == 1 ? st.checked : undefined}>
          <input
            className={st.input_radio}
            type="radio"
            value="1"
            checked={checkedIdx == 1}
            onChange={onChangeRadioBtn}
          />
          <span className={st.p}>자세히</span>
        </label>
        <label className={checkedIdx == 2 ? st.checked : undefined}>
          <input
            className={st.input_radio}
            type="radio"
            value="2"
            checked={checkedIdx == 2}
            onChange={onChangeRadioBtn}
          />
          <span className={st.p}>간략히</span>
        </label>
        <label className={checkedIdx == 3 ? st.checked : undefined}>
          <input
            className={st.input_radio}
            type="radio"
            value="3"
            checked={checkedIdx == 3}
            onChange={onChangeRadioBtn}
          />
          <span className={st.p}>언어만</span>
        </label>
      </div>
      <div className={st.selectBox}>
        <span>테마 설정</span>
        <select
          className={st.selectSV}
          onClick={onClickSVTheme}
          defaultValue={mulTheme}
        >
          {MULThemeData.map((data: string, index: number) => {
            return (
              <option value={data} key={index}>
                {data}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <PrevBtn />
        <NextBtn />
      </div>
    </div>
  );
}
