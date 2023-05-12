"use client";

import Baekjoon from "@/Component/Readme/Baekjoon";
import st from "./page.module.scss";
import Preview from "@/Component/Readme/Preview";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Main from "@/Component/Readme/Main";
import Comp from "@/Component/Readme/Comp";

export default function Readme() {
  const nextComp = useAppSelector(selectReadme).nextComp;
  // const prevComp = useAppSelector(selectReadme).prevComp;
  // const currComponent = useAppSelector(selectReadme).currComponent;
  // // console.log(`nextComp: ${nextComp}`);
  // // console.log(`prevComp: ${prevComp}`);
  // // console.log(`currComponent: ${currComponent}`);

  const componentArr = useAppSelector(selectReadme).componentArr;
  const prevComp = useAppSelector(selectReadme).prevComp;
  const currComponent = useAppSelector(selectReadme).currComponent;
  // console.log(`currComponent: ${currComponent}`);
  console.log(`prevComp: ${prevComp}`);
  console.log(`nextComp: ${nextComp}`);
  console.log(`componentArr: ${componentArr}`);
  return (
    <div className={st.body}>{currComponent === 0 ? <Main /> : <Comp />}</div>
  );
}
