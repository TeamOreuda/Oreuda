"use client";
import st from "./AddText.module.scss";

import {
  setMinusText,
  setTextDesc,
  setTextTitle,
} from "@/store/modules/readme";
import { useDispatch } from "react-redux";

export default function MinusTextBtn({ idx, onStateChange }: any) {
  const dispatch = useDispatch();
  const deleteTextDiv = () => {
    dispatch(setMinusText(idx));

    // curr이 0이되면서 input값의 title/desc 모두 초기화
    onStateChange(0);
    dispatch(setTextTitle(""));
    dispatch(setTextDesc(""));
  };
  return (
    <button className={st.buttonDefault} onClick={deleteTextDiv}>
      제거
    </button>
  );
}
