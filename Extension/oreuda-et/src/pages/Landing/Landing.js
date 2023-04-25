import styles from "./Landing.module.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.logoDiv}>
        <img className={styles.logo} src="/Frame 36.png"></img>
        <div className={styles.logoTitle}>O R E U D A</div>
      </div>
      <Link to = "/main">
      <div className={styles.loginBtn}>Github LOG IN</div>
      </Link>
      <div className={styles.footer}>
        powered by{" "}
        <a
          href="https://www.notion.so/a1184fd74f9142b8ad5880e41a1e590d"
          target="_blank"
        >
          햣
        </a>
      </div>
    </div>
  );
};

export default Landing;