import Link from "next/link";
import st from "./LandingHeader.module.scss";

export default function LandingHeader() {
  return (
    <div className={st.header}>
      <div className={st.logo}>
        <span>O R E U D A</span>
      </div>
      <div className={st.button}>
        <button>다운로드</button>
        <Link
          href="http://52.79.221.133:8090/oauth2/authorization/github"
          className={st.loginButton}
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
