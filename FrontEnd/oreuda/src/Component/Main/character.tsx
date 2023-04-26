import Image from "next/image";

import st from "./character.module.scss";

const characterSkill: Array<String> = [
  "ground",
  "sprout",
  "tree",
  "tree1",
  "tree2",
  "tree3",
  "tree4",
  "tree5",
  "mountain",
];

export default function Character() {
  const characterId: number = 7;
  return (
    <div>
      <div className={st.header}>
        <ul>나의 성장 식물</ul>
        <Image className={st.img} src="/images/info.svg" alt="" width={24} height={24} />
      </div>
      <ul className={st.discription}>현재 성장 식물을 나타냅니다</ul>
      <Image
        className={st.character}
        src={`/images/character/${characterSkill[characterId]}.svg`}
        alt=""
        width={320}
        height={320}
      />
    </div>
  );
}
