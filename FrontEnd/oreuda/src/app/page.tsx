import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";

export default function Home() {
  return (
    <div className={st.body}>
      <Statistic />
      <div className={st.character}>
        <div>캐릭터</div>
        <div>그래프</div>
      </div>
    </div>
  );
}
