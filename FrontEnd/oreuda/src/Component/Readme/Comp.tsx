"use client";

import { useAppSelector } from "@/store/hooks";
import Baekjoon from "./Baekjoon";
import st from "./Comp.module.scss";
import Preview from "./Preview";
import { selectReadme } from "@/store/modules/readme";
import Main from "./Main";
import Github from "./Github";

export default function Comp() {
  const currComponent: number = useAppSelector(selectReadme).currComponent;
  // console.log(`currComponent: ${currComponent}`);
  console.log(typeof currComponent);

  function showComponent() {
    // if (currComponent == 0) return <Main />;
    // else if (currComponent == 1) return <Baekjoon />;
    // else if (currComponent == 2) return <Github />;
    // else if (currComponent == 8) return <div>마지막 페이지</div>;
    // else return <div>에러 페이지</div>;
    switch (Number(currComponent)) {
      case 0:
        return <Main />;
      case 1:
        return <Baekjoon />;
      case 2:
        return <Github />;
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
