"use client";
import st from "./Tech.module.scss";

import {
  setChoiceTechClear,
  setMinusTechWhole,
  setMinusText,
  setTechTitle,
} from "@/store/modules/readme";
import { useDispatch } from "react-redux";

export default function MinusTechBtn({ idx, onStateChange }: any) {
  const dispatch = useDispatch();
  const deleteTextDiv = () => {
    dispatch(setMinusTechWhole(idx));

    // curr 0이되면서 제목 및 기술설정 초기화
    onStateChange(0);
    dispatch(setTechTitle(""));
    dispatch(setChoiceTechClear(0));
  };
  return (
    <button className={st.buttonDefault} onClick={deleteTextDiv}>
      제거
    </button>
  );
}
