"use client";
import st from "./Baekjoon.module.scss";

import { setMinusText } from "@/store/modules/readme";
import { useDispatch } from "react-redux";

export default function MinusTextBtn({ idx }: any) {
  const dispatch = useDispatch();
  const deleteTextDiv = () => {
    // console.log(idx);
    dispatch(setMinusText(idx));
  };
  return (
    <div className={st.button} onClick={deleteTextDiv}>
      <button>-</button>
    </div>
  );
}
