import st from "./Landing.module.scss";

import LandingHeader from "./LandingHeader";
import LandingRepo from "./LandingRepo";
import PageFormat from "./PageFormat";

export default function Landing() {
  return (
    <div className={st.page}>
      <LandingHeader />
      <PageFormat />
    </div>
  );
}
