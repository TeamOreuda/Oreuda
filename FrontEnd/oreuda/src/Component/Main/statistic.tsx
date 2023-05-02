import Image from "next/image";

import st from "./statistic.module.scss";

interface userData {
  commitCnt: number;
  respositoryCnt: number;
  streatMax: number;
  mainLanguage: string;
  userName: string;
}

const userData: userData = {
  commitCnt: 7,
  respositoryCnt: 4,
  streatMax: 24,
  mainLanguage: "hello",
  userName: "사막여우",
};

interface gitHubStatistic {
  title: string;
  count?: number;
  language?: string;
  howCount?: string;
  imageName: string;
}

const gitHubStatistic: gitHubStatistic[] = [
  {
    title: "총 커밋 수",
    count: userData.commitCnt,
    howCount: "개",
    imageName: "target",
  },
  {
    title: "레포지토리 수",
    count: userData.respositoryCnt,
    howCount: "개",
    imageName: "folder",
  },
  {
    title: "최고 잔디 스트릭",
    count: userData.streatMax,
    howCount: "일",
    imageName: "grass",
  },
  {
    title: "주 언어",
    language: userData.mainLanguage,
    imageName: "typescript",
  },
];

export default function Statistic() {
  return (
    <div>
      <ul className={st.header}>
        <span>{userData.userName}</span>
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
            <Image
              src={`/images/main/${e.imageName}.svg`}
              alt=""
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
