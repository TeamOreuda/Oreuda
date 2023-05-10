import st from "./Landing.module.scss";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { saveToken } from "../../store/tokenSlice";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chrome = window.chrome;

  const [isLoading, setIsLoading] = useState(false);

  // const currentUrl = window.location.href;
  // console.log("Landing : " + currentUrl);

  // 이미 로그인 상태면 main 페이지로 보내준다.
  useEffect(() => {
    chrome.cookies.get(
      { url: process.env.REACT_APP_DOMAIN, name: "Authorization" },
      function (cookie) {
        if (cookie) {
          // console.log(cookie.value);
          dispatch(saveToken(cookie.value));
          navigate("/main");
        } else {
          console.log("The cookie is not found.");
          setIsLoading(true);
        }
      }
    );
  }, []);

  const login = () => {
    // console.log(process.env.REACT_APP_LOGIN_URL);
    // 창을 열 때
    chrome.windows.create(
      {
        url: process.env.REACT_APP_LOGIN_URL,
        type: "popup",
        width: 800,
        height: 600,
      },
      function (newWindow) {
        // 창이 닫히는 이벤트를 등록
        chrome.windows.onRemoved.addListener(function (windowId) {
          if (newWindow.id === windowId) {
            navigate("/main");
            // console.log(newWindow.tabs[0].pendingUrl);
          }
        });
      }
    );
  };
  if (isLoading) {
    return (
      <div className={st.landing}>
        <div className={st.logoDiv}>
          <img className={st.logo} src="/mainLogo.svg"></img>
          <div className={st.logoTitle}>O R E U D A</div>
        </div>

        <div className={st.loginBtn} onClick={login}>
          <div className={st.loginTitle}>
            <img src="/assets/loginGitWord.svg"></img>
          </div>
        </div>
        <div className={st.footer}>
          powered by{" "}
          <a href="https://oreuda.kr/" target="_blank">
            햣
          </a>
        </div>
      </div>
    );
  }
};

export default Landing;
