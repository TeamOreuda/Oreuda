"use client";

import st from "./Tech.module.scss";
import lang from "./Language.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectReadme, setDeleteTech } from "@/store/modules/readme";
import { techData } from "./Tech";

export default function TechSelectBtn({ curr }: any) {
  const techPlusArr = useAppSelector(selectReadme).techPlusArr;
  const techPlusModifyArr = useAppSelector(selectReadme).techPlusModifyArr;
  const techModifyArr = useAppSelector(selectReadme).techModifyArr;

  let data = curr === 0 ? techPlusArr : techPlusModifyArr;

  const dispatch = useAppDispatch();

  const onClickRemoveComp = (e: any) => {
    dispatch(setDeleteTech({ data: techData[e.target.id], curr: curr }));
  };
  return (
    <div className={st.choiceBox}>
      {data.map((el: any, index: number) => {
        return (
          <div
            key={index}
            id={el.index}
            onClick={onClickRemoveComp}
            className={lang[el.name]}
          >
            {el.name}
          </div>
        );
      })}
    </div>
  );
}
