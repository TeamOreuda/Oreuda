import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";
import { Provider } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";

export default function Home() {
  return (
    // <Provider store={store}>
    <div className={st.body}>
      <Statistic />
      <div className={st.character}>
        <Character />
        <CharacterGraph />
      </div>
    </div>
    // </Provider>
  );
}
