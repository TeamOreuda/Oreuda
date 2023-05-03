"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";

import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectReadme,
  setTextDesc,
  setTextTitle,
} from "@/store/modules/readme";
import PlusTextBtn from "./PlusTextBtn";

export default function AddText() {
  const dispatch = useAppDispatch();
  const textTitleArr = useAppSelector(selectReadme).textTitle;
  const textDescArr = useAppSelector(selectReadme).textDesc;
  const TitleArrLastVal = textTitleArr[textTitleArr.length - 1];
  const DescArrLastVal = textDescArr[textDescArr.length - 1];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // const activeEnter = (e: any) => {
  //   if (e.key === "Enter") {

  //   }
  // };

  return (
    <div className={st.body}>
      <div className={st.titleDiv}>
        <span>추가 텍스트(Add Text)</span>
        <p>추가로 작성하고 싶은 텍스트가 있다면 작성해주세요!</p>
      </div>
      <div className={st.ContentDiv}>
        <div className={st.mailDiv}>
          <p>제목</p>
          <input
            className={st.TextTitleInput}
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </div>
        <div className={st.mailDiv}>
          <p>내용</p>
          <input
            className={st.TextDescInput}
            type="description"
            placeholder="내용을 입력해주세요."
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></input>
        </div>
        <div>
          <PlusTextBtn titleArr={title} descArr={desc} />
          <PrevBtn />
          <NextBtn />
        </div>
      </div>
    </div>
  );
}
