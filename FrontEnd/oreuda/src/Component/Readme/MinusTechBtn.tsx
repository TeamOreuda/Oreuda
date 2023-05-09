"use client";
import st from "./Tech.module.scss";

import { setMinusTechWhole, setMinusText } from "@/store/modules/readme";
import { useDispatch } from "react-redux";

export default function MinusTechBtn({ idx, onStateChange }: any) {
  const dispatch = useDispatch();
  const deleteTextDiv = () => {
    dispatch(setMinusTechWhole(idx));
    onStateChange(0);
  };
  return (
    <button className={st.buttonDefault} onClick={deleteTextDiv}>
      제거
    </button>
  );
}
