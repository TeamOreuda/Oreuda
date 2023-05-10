"use client";

import st from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectReadme, setDeleteComponent } from "@/store/modules/readme";
import { mainCompChoiceData } from "./Main";

export default function MainSelectBtn() {
  const nextComp = useAppSelector(selectReadme).nextComp;
  const dispatch = useAppDispatch();

  const onClickRemoveComp = (e: any) => {
    console.log(e.target.id);
    dispatch(setDeleteComponent(e.target.id));
  };
  return (
    <div className={st.choiceBox}>
      {nextComp.map((el: any, index: number) => {
        return (
          <div
            key={index}
            id={el}
            onClick={onClickRemoveComp}
            className={st.choiceComp}
          >
            {mainCompChoiceData[el]}
          </div>
        );
      })}
    </div>
  );
}