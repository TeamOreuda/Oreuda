"use client";

import { setAddText, setTextDesc, setTextTitle } from "@/store/modules/readme";
import st from "./AddText.module.scss";

import { useAppDispatch } from "@/store/hooks";

export default function PlusTextBtn({ titleArr, descArr, onStateChange }: any) {
  const dispatch = useAppDispatch();

  const addTextDiv = () => {
    dispatch(setAddText({ titleArr, descArr }));
    dispatch(setTextTitle(titleArr));
    dispatch(setTextDesc(descArr));

    // curr이 0이되면서 input값의 title/desc 모두 초기화
    onStateChange(0);
  };
  return (
    <button className={st.buttonDefault} onClick={addTextDiv}>
      추가
    </button>
  );
}
