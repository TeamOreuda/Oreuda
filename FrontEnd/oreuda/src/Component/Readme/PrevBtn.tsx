"use client";

import st from "./Baekjoon.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { setPrevCompMoving } from "@/store/modules/readme";

export default function PrevBtn() {
  const dispatch = useAppDispatch();

  return (
    <button
      className={st.buttonPrev}
      onClick={() => dispatch(setPrevCompMoving(0))}
    >
      이전
    </button>
  );
}
