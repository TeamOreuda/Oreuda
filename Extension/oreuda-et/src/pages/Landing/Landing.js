import st from "./Landing.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getUserInfo } from "../../api/user";
import { saveToken } from "../../store/tokenSlice";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chrome = window.chrome;

  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentUrl = window.location.href;
  console.log("Landing : " + currentUrl);

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

    // // URL 쿼리 문자열 가져오기
    // const queryParams = new URLSearchParams(window.location.search);

    // // 쿼리 파라미터에서 accessToken과 refreshToken 추출하기
    // const accessTokenParam = queryParams.get("Authorization");
    // const refreshTokenParam = queryParams.get("refreshToken");
    // if (!accessTokenParam && refreshTokenParam) {

    //   // 로그인 실행

    //   setAccessToken(accessTokenParam);
    //   setRefreshToken(refreshTokenParam);
    //   chrome.cookies.set({
    //     url: "http://localhost:3000",
    //     name: "atk",
    //     value: accessTokenParam,
    //   });
    //   chrome.cookies.set({
    //     url: "http://localhost:3000",
    //     name: "rtk",
    //     value: refreshTokenParam,
    //   });
    // } else {
    //   chrome.cookies.get(
    //     { url: "http://localhost:3000", name: "atk" },
    //     function (cookie) {
    //       if (cookie) {
    //         console.log(cookie.value);
    //         navigate("/main");
    //       } else {
    //         console.log("The cookie is not found.");
    //         setIsLoading(true);
    //       }
    //     }
    //   );
    // }
  }, []);

  const login = () => {
    console.log(process.env.REACT_APP_LOGIN_URL);
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
            console.log("창이 닫혔습니다.");
            navigate("/main");
            console.log(newWindow);
            console.log(newWindow.tabs[0].pendingUrl);
          }
        });
      }
    );
    
  };
  if (isLoading) {
    return (
      <div className={st.landing}>
        <div className={st.logoDiv}>
          <img className={st.logo} src="/Frame 36.png"></img>
          <div className={st.logoTitle}>O R E U D A</div>
        </div>

        <div className={st.loginBtn} onClick={login}>
          Github LOG IN
        </div>
        <div className={st.footer}>
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
