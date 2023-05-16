import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import st from "./Header.module.scss";

import { getUserInfo } from "../../api/user";
import { renewalDataFromGit } from "../../api/data";

import {
  removeFolderIdCookie,
  removeColorCookie,
  removeFolderNameCookie,
  removeATKCookie,
  removeRTKCookie,
} from "../../api/cookie";

const Header = () => {
  const navigate = useNavigate();
  const atk = useSelector((state) => state.accessToken.token);
  const [user, SetUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserInfo(atk).then((response) => {
      SetUser(response);
      setIsLoading(true);
    });
  }, [atk]);

  const renewalData = () => {
    if (atk) {
      renewalDataFromGit(atk).then((response)=>{
        console.log(response)
      });
    }
  };

  // 쿠키 값을 삭제한다. 삭제하면 랜딩페이지로 이동
  const logout = () => {
    removeFolderIdCookie();
    removeColorCookie();
    removeFolderNameCookie();
    removeATKCookie();
    removeRTKCookie();
    navigate("/");
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
          <div className={st.settingBtn} onClick={logout}>
            <img className={st.settingIcon} src="/assets/logout.svg"></img>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
