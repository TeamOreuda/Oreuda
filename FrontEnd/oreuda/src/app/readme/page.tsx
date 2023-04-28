"use client";

import Baekjoon from "@/Component/Readme/Baekjoon";
import st from "./page.module.scss";
import Preview from "@/Component/Readme/Preview";

export default function Readme() {
  return (
    <div className={st.body}>
      <div className={st.leftBody}>
        <Baekjoon />
      </div>
      <div className={st.rightBody}>
        <Preview />
      </div>
    </div>
  );
}
