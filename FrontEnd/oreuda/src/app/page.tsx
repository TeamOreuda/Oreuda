import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";

export default function Home() {
  return (
    <div className={st.body}>
      <Statistic />
      <div className={st.character}>
        <Character />
        <div>그래프</div>
      </div>
    </div>
  );
}
