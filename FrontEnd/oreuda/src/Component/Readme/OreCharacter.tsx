"use client";

import st from "./Contact.module.scss";

export default function OreCharacter() {
  return (
    <div className={st.ContactMain}>
      <div className={st.titleDiv}>
        <span>오르 캐릭터(Ore)</span>
        <p>
          최근 6개월 간 사용자의 깃허브 추이를 분석하여 <br />
          Oreuda만의 캐릭터로 레벨을 표현해 줍니다🌱
        </p>
      </div>
      <div className={st.contentDiv}></div>
    </div>
  );
}
