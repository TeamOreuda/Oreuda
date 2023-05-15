import st from "./Landing.module.scss";

import LandingHeader from "./LandingHeader";
import LandingRepo from "./LandingRepo";
import PageFormat from "./PageFormat";

import Main1 from "./Main1";

export default function Landing() {
  return (
    <div className={st.page}>
      {/* <LandingHeader />
      <PageFormat /> */}
      <Main1 />
    </div>
  );
}
