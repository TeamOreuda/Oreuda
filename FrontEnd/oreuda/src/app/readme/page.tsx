"use client";

import Baekjoon from "@/Component/Readme/Baekjoon";
import st from "./page.module.scss";
import Preview from "@/Component/Readme/Preview";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Main from "@/Component/Readme/Main";
import Comp from "@/Component/Readme/Comp";

export default function Readme() {
  const nextCompData = useAppSelector(selectReadme).nextComp;
  const prevCompData = useAppSelector(selectReadme).prevComp;
  console.log(`nextCompData: ${nextCompData}`);
  console.log(`prevCompData: ${prevCompData}`);
  const isReadmeMain = useAppSelector(selectReadme).isReadmeMainPage;
  return <div className={st.body}>{isReadmeMain ? <Main /> : <Comp />}</div>;
}
