"use client";

import { useAppSelector } from "@/store/hooks";
import Baekjoon from "./Baekjoon";
import st from "./Comp.module.scss";
import Preview from "./Preview";
import { selectReadme } from "@/store/modules/readme";
import Main from "./Main";

export default function Comp() {
  const choiceStackData = useAppSelector(selectReadme).currComponent;
  console.log(choiceStackData);

  function showComponent() {
    switch (choiceStackData) {
      case 1:
        return <Baekjoon />;
      default:
        return <Main />;
    }
  }
  return (
    <div className={st.Comp}>
      <div className={st.leftBody}>{showComponent()}</div>
      <div className={st.rightBody}>
        <Preview />
      </div>
    </div>
  );
}
