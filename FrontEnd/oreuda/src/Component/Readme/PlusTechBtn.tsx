"use client";

import { setAddTechWhole } from "@/store/modules/readme";
import st from "./Tech.module.scss";

import { useAppDispatch } from "@/store/hooks";

export default function PlusTechBtn({ title }: any) {
  const dispatch = useAppDispatch();
  const addTechDiv = () => {
    dispatch(setAddTechWhole({ title }));
  };
  return (
    <button className={st.buttonDefault} onClick={addTechDiv}>
      추가
    </button>
  );
}
