"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";
import {
  selectReadme,
  setBaekjoonId,
  setSolvedTheme,
} from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const svDesignData: string[] = ["warm", "cold", "dark"];

export default function Baekjoon() {
  const baekJoonIdData = useAppSelector(selectReadme).baekjoonId;
  const solvedTheme = useAppSelector(selectReadme).solvedTheme;
  const [id, setId] = useState(baekJoonIdData);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setBaekjoonId(id));
    }
  };

  const onClickSVTheme = (data: any) => {
    dispatch(setSolvedTheme(data));
  };

  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>백준(Baek Joon)</span>
        <p>백준의 티어와 솔브드 잔디를 보여줍니다😁</p>
      </div>
      <div className={st.contentDiv}>
        <input
          type="text"
          placeholder="백준 아이디"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => activeEnter(e)}
          onKeyUp={() => dispatch(setBaekjoonId(id))}
          value={id}
        ></input>
        {/* <div className={st.selectBox}>
          <span>테마 설정</span>
          <select
            className={st.selectSV}
            onClick={onClickSVTheme}
            defaultValue={solvedTheme}
          >
            {svDesignData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        </div> */}
        <div className={`${st.dropdown} ${openModal ? st.option : ""}`}>
          <input
            type="text"
            className={openModal ? st.focusInput : ""}
            placeholder="테마를 선택해주세요"
            readOnly
            value={solvedTheme}
            onClick={(e) => {
              setOpenModal(!openModal);
            }}
          />
          <div className={` ${openModal ? st.option : st.display}`}>
            {svDesignData.map((data: string, index: number) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    // setOptionVal(data);
                    setOpenModal(!openModal);
                    onClickSVTheme(data);
                  }}
                >
                  {data}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
