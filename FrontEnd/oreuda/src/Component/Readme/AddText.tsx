"use client";

import { useState } from "react";
import st from "./AddText.module.scss";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectReadme,
  setModifyDesc,
  setModifyTitle,
  setTextDesc,
  setTextTitle,
} from "@/store/modules/readme";
import PlusTextBtn from "./PlusTextBtn";
import MinusTextBtn from "./MinusTextBtn";
import Image from "next/image";

export default function AddText() {
  const dispatch = useAppDispatch();
  const textTitleArr = useAppSelector(selectReadme).textTitle;
  const textDescArr = useAppSelector(selectReadme).textDesc;
  const textArr = useAppSelector(selectReadme).textArr;

  const TitleArrLastVal = textTitleArr[textTitleArr.length - 1];
  const DescArrLastVal = textDescArr[textDescArr.length - 1];

  const [title, setTitle] = useState("");
  const [modifyT, setModifyT] = useState("");
  const [desc, setDesc] = useState("");
  const [modifyD, setModifyD] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [curr, setCurr] = useState(0);

  const cleanInput = () => {
    setTitle("");
    setDesc("");
    dispatch(setTextTitle(""));
    dispatch(setTextDesc(""));
  };

  const handleStateChange = (newState: number) => {
    setCurr(newState);
  };

  return (
    <div className={st.body}>
      <div className={st.indexBtns}>
        <Image
          src="/images/readme/notebook.gif"
          alt=""
          className={st.btnDefault}
          width={40}
          height={40}
          onClick={() => {
            setCurr(0);
            setTitle("");
            setDesc("");
            // dispatch(setChoiceTechClear(0));
          }}
        />
        {textArr?.map((el, index) => {
          return (
            <button
              key={index + 1}
              onClick={() => {
                // setTitle(el.titleArr);
                // setDesc(el.descArr);
                setModifyT(el.titleArr);
                setModifyD(el.descArr);
                setTextIdx(el.index);
                setCurr(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className={st.titleDiv}>
        <span>추가 텍스트(Add Text)</span>
        <p>추가로 작성하고 싶은 텍스트가 있다면 작성해주세요!</p>
      </div>
      <div className={st.contentDiv}>
        <div className={st.mailDiv}>
          <p>제목</p>
          <input
            className={st.TextTitleInput}
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              if (curr == 0) {
                setTitle(e.target.value);
                dispatch(setTextTitle(e.target.value));
              } else {
                setModifyT(e.target.value);
                dispatch(setModifyTitle({ data: e.target.value, idx: curr }));
              }
            }}
            value={curr == 0 ? title : modifyT}
          ></input>
        </div>
        <div className={st.mailDiv}>
          <p>내용</p>
          <textarea
            className={st.TextDescInput}
            placeholder="내용을 입력해주세요."
            onChange={(e) => {
              if (curr == 0) {
                const a = e.target.value.replace(/(\n|\r\n)/g, "<br />");
                setDesc(e.target.value + "");
                dispatch(setTextDesc(e.target.value));
              } else {
                setModifyD(e.target.value);
                dispatch(setModifyDesc({ data: e.target.value, idx: curr }));
              }
            }}
            value={curr == 0 ? desc : modifyD}
          ></textarea>
        </div>
        <div>
          <div className={st.btnDiv}>
            {curr == 0 && (title.length > 0 || desc.length > 0) ? (
              <PlusTextBtn
                titleArr={title}
                descArr={desc}
                onStateChange={cleanInput}
              />
            ) : undefined}

            {textArr.length > 0 && curr !== 0 ? (
              <MinusTextBtn idx={textIdx} onStateChange={handleStateChange} />
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
