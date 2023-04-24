import styles from "./Landing.module.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.logoDiv}>
        <img className={styles.logo} src="/logo192.png"></img>
        <div>O R E U D A</div>
      </div>
      <Link to = "/main">
        <div className={styles.loginBtn}>로그인 버튼</div>
      </Link>
      <div className={styles.footer}>powered by 햣</div>
    </div>
  );
};

export default Landing;
