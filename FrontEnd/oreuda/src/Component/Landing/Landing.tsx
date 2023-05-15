import st from "./Landing.module.scss";

import Main1 from "./Mains/Main1";
import Main2 from "./Mains/Main2";

export default function Landing() {
  return (
    <div className={st.page}>
      <Main1 />
      {/* <Main2 /> */}
    </div>
  );
}
