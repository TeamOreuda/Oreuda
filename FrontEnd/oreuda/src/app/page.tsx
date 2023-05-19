"use client";

// import { hotjar } from "react-hotjar";
import { useEffect } from "react";

import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";
import Head from "next/head";

export default function Home() {
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development") {
  //     hotjar.initialize(3483558, 6);
  //   }
  // }, []);

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="💻 [ 나만의  github 꾸미기 ] 서비스"
        />
        <meta
          property="og:description"
          content="오르다는 깃허브 정보를 통해 능력치를 계산하고, 성장 식물과 그래프로 시각화해 줍니다."
        />
        <meta property="og:image" content="/images/linkView.svg" />
        <meta property="og:url" content="https://oreuda.kr/" />
      </Head>
      <div className={st.body}>
        <Statistic />
        <div className={st.character}>
          <Character />
          <CharacterGraph />
        </div>
      </div>
    </>
  );
}
