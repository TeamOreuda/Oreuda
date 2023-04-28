import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";
import { Provider } from "react-redux";

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
