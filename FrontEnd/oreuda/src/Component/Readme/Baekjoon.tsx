"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";
import { selectReadme, setBaekjoonId } from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Baekjoon() {
  const [id, setId] = useState("");

  const dispatch = useAppDispatch();
  const baekJoonIdData = useAppSelector(selectReadme);
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setBaekjoonId(id));
    }
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
        {/* <button>확인</button> */}
      </div>
    </div>
  );
}
