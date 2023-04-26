import Image from "next/image";
import st from "./charactergraph.module.scss";

export default function Character() {
  return (
    <div>
      <ul className={st.header}>성장차트</ul>
      <ul className={st.discription}>성장 곡선을 차트를 통해 확인해보세요</ul>
      <Image
        className={st.character}
        src="/images/main/graph.svg"
        alt=""
        width={650}
        height={320}
      />
    </div>
  );
}
