import st from "./LandingHeader.module.scss";

export default function LandingHeader() {
  return (
    <div className={st.header}>
      <div className={st.logo}>
        <span>O R E U D A</span>
      </div>
      <div className={st.buttons}>
        <div className={st.downloadButton}>다운로드</div>
        <div className={st.loginButton}>로그인</div>
      </div>
    </div>
  );
}
