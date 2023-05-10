"use client";
import st from "./AddText.module.scss";

import { setMinusText } from "@/store/modules/readme";
import { useDispatch } from "react-redux";

export default function MinusTextBtn({ idx }: any) {
  const dispatch = useDispatch();
  const deleteTextDiv = () => {
    // console.log(idx);
    dispatch(setMinusText(idx));
  };
  return (
    <button className={st.buttonDefault} onClick={deleteTextDiv}>
      제거
    </button>
  );
}
