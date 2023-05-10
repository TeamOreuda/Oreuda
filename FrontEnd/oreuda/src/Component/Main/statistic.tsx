"use client";

import Image from "next/image";

import st from "./statistic.module.scss";

interface gitHubStatistic {
  title: string;
  count?: number;
  language?: string;
  howCount?: string;
  imageName: string;
}

export default function Statistic(props: any) {
  const { userData } = props;

  const gitHubStatistic: gitHubStatistic[] = [
    {
      title: "총 커밋 수",
      count: userData?.commitCnt,
      howCount: "개",
      imageName: "target",
    },
    {
      title: "레포지토리 수",
      count: userData?.repositoryCnt,
      howCount: "개",
      imageName: "folder",
    },
    {
      title: "최고 잔디 스트릭",
      count: userData?.streakMax,
      howCount: "일",
      imageName: "grass",
    },
    {
      title: "주 언어",
      language: userData?.mainLanguage,
      imageName: "typescript",
    },
  ];

  return (
    <div>
      <ul className={st.header}>
        <span>{userData?.nickname}</span>
        님의 깃헙을 분석해 봤어요.
      </ul>
      <div className={st.statistic}>
        {gitHubStatistic.map((e) => (
          <div key={e.title} className={st.box}>
            <div>
              <ul>{e.title}</ul>
              <span>
                {e.count} <span>{e.howCount}</span>
              </span>
              <span>{e.language}</span>
            </div>
            <Image src={`/images/main/${e.imageName}.svg`} alt="" width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
