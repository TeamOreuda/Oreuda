"use client";

import st from "./Comp.module.scss";

import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";

import Main from "./Main";
import Baekjoon from "./Baekjoon";
import Github from "./Github";
import MUL from "./MUL";
import Contact from "./Contact";
import Tech from "./Tech";
import OreCharacter from "./OreCharacter";
import AddText from "./AddText";
import Sorting from "./Sorting";
import Preview from "./Preview";

export default function Comp() {
  const currComponent: number = useAppSelector(selectReadme).currComponent;

  function showComponent() {
    switch (Number(currComponent)) {
      case 0:
        return <Main />;
      case 1:
        return <Baekjoon />;
      case 2:
        return <Github />;
      case 3:
        return <MUL />;
      case 4:
        return <Tech />;
      case 5:
        return <Contact />;
      case 6:
        return <OreCharacter />;
      case 7:
        return <AddText />;
      case 8:
        return <Sorting />;
      default:
        return <div>에러 페이지</div>;
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
