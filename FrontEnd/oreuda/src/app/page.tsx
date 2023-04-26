import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";

export default function Home() {
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
