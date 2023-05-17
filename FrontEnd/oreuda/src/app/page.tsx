"use client";

// import { hotjar } from "react-hotjar";
import { useEffect } from "react";

import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";

export default function Home() {
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development") {
  //     hotjar.initialize(3483558, 6);
  //   }
  // }, []);

  return (
    <div className={st.body}>
      <Statistic />
      <div className={st.character}>
        <Character />
        <CharacterGraph />
      </div>
    </div>
  );
}
