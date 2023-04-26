import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import st from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  
  // 쿠키 값을 삭제한다. 삭제하면 랜딩페이지로 이동
  const renewalData = () => {


    // const chrome = window.chrome;
    // chrome.cookies.remove(
    //   { url: "http://localhost:3000", name: "atk" },
    //   function (cookie) {
    //     if (!cookie.value) {
    //       console.log("The cookie Deleted");
    //       navigate("/");
    //     } else {
    //       console.log(cookie.value);
    //     }
    //   }
    // );

    
  };

  const setting = () => {
    console.log("setting");
    cookie.remove("atk");

    if (!cookie.load("atk")) {
      window.location.replace(`/main`);
    }
  };

  return (
    <div className={st.header}>
      <div className={st.layoutLeft}>
        <div className={st.userName}>tykimdream</div>
      </div>
      <div className={st.layoutRight}>
        <div className={st.renewalBtn} onClick={renewalData}>
          <img src="/assets/renewal.png"></img>
        </div>
        <div className={st.settingBtn} onClick={setting}>
          <img src="/assets/setting.png"></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
