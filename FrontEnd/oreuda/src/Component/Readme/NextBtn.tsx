"use client";

import st from "./Baekjoon.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { setNextCompMoving } from "@/store/modules/readme";

export default function NextBtn() {
  const dispatch = useAppDispatch();

  return (
    <button
      className={st.button}
      onClick={() => dispatch(setNextCompMoving(0))}
    >
      다음
    </button>
  );
}
