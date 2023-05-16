"use client";

import {
  setAddTechWhole,
  setChoiceTechClear,
  setTechTitle,
} from "@/store/modules/readme";
import st from "./Tech.module.scss";

import { useAppDispatch } from "@/store/hooks";

export default function PlusTechBtn({ title, onStateChange }: any) {
  const dispatch = useAppDispatch();
  const addTechDiv = () => {
    dispatch(setAddTechWhole({ title }));

    // curr 0이되면서 제목 및 기술설정 초기화
    onStateChange(0);
    dispatch(setTechTitle(""));
    dispatch(setChoiceTechClear(0));
  };
  return (
    <button className={st.buttonDefault} onClick={addTechDiv}>
      추가
    </button>
  );
}
