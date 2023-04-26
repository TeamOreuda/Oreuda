import styles from "./Landing.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const chrome = window.chrome;

  const currentUrl = window.location.href;
  console.log("Landing : " + currentUrl);

  // 이미 로그인 상태면 main 페이지로 보내준다.
  useEffect(() => {
    chrome.cookies.get(
      { url: "http://localhost:3000", name: "atk" },
      function (cookie) {
        if (cookie) {
          console.log(cookie.value);
          navigate("/main");
        } else {
          console.log("The cookie is not found.");
          setIsLoading(true);
        }
      }
    );
  }, []);

  const login = () => {
    chrome.cookies.set({
      url: "http://localhost:3000",
      name: "atk",
      value: "1234",
    });
  };
  if (isLoading) {
    return (
      <div className={styles.landing}>
        <div className={styles.logoDiv}>
          <img className={styles.logo} src="/Frame 36.png"></img>
          <div className={styles.logoTitle}>O R E U D A</div>
        </div>
        <Link to="/main">
          <div className={styles.loginBtn} onClick={login}>
            Github LOG IN
          </div>
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
  }
};

export default Landing;
