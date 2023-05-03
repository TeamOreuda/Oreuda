"use client";

import st from "./Baekjoon.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { setNextCompMoving } from "@/store/modules/readme";

export default function NextBtn() {
  const dispatch = useAppDispatch();

  return (
    <div className={st.button}>
      <button onClick={() => dispatch(setNextCompMoving(0))}>다음</button>
    </div>
  );
}
