"use client";

import { setTextDesc, setTextTitle } from "@/store/modules/readme";
import st from "./Baekjoon.module.scss";

import { useAppDispatch } from "@/store/hooks";

export default function PlusTextBtn({ titleArr, descArr }: any) {
  const dispatch = useAppDispatch();

  console.log(titleArr);
  console.log(descArr);

  const addTextDiv = () => {
    dispatch(setTextTitle(titleArr));
    dispatch(setTextDesc(descArr));
  };
  return (
    <div className={st.button} onClick={addTextDiv}>
      <button>+</button>
    </div>
  );
}
