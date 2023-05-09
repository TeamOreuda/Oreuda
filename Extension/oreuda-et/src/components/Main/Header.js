import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useSelector, useDispatch } from "react-redux";

import st from "./Header.module.scss";

import { getUserInfo } from "../../api/user";

const Header = () => {
  const navigate = useNavigate();
  const atk = useSelector((state) => state.accessToken.token);
  const [user, SetUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.chrome.cookies.get(
      { url: process.env.REACT_APP_API_URL, name: "Authorization" },
      function (cookie) {
        if (cookie) {
          console.log(cookie.value);
        }
      }
    );
  }, []);

  useEffect(() => {
    getUserInfo(atk).then((response) => {
      console.log(response);
      SetUser(response);
      setIsLoading(true);
    });
  }, [atk]);

  // 쿠키 값을 삭제한다. 삭제하면 랜딩페이지로 이동
  const renewalData = () => {
    window.chrome.cookies.remove({
      url: process.env.REACT_APP_DOMAIN,
      name: "Authorization",
    });
    window.chrome.cookies.remove(
      { url: process.env.REACT_APP_DOMAIN, name: "RefreshToken" },
      function (cookie) {
        if (!cookie.value) {
          console.log("The cookie Deleted");
          navigate("/");
        } else {
          console.log(cookie.value);
        }
      }
    );
  };

  const setting = () => {
    console.log("setting");
    cookie.remove("atk");

    if (!cookie.load("atk")) {
      window.location.replace(`/main`);
    }
  };

  if (isLoading && user) {
    return (
      <div className={st.header}>
        <div className={st.layoutLeft}>
          <div className={st.userName}>{user.nickname}</div>
        </div>
        <div className={st.layoutRight}>
          <div className={st.renewalBtn} onClick={renewalData}>
            <img className={st.renewalIcon} src="/assets/renewal.svg"></img>
          </div>
          <div className={st.settingBtn} onClick={setting}>
            <img className={st.settingIcon} src="/assets/setting.svg"></img>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
