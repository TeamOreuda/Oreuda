"use client";
import React, { useEffect,useState } from "react";
import Cookies from "js-cookie";
// import AOS from "aos";
import "aos/dist/aos.css";

import st from "./Landing.module.scss";

import Main1 from "./Mains/Main1";
import Main2 from "./Mains/Main2";
import Main3 from "./Mains/Main3";

export default function Landing() {
  const ACCESS_TOKEN = Cookies?.get("Authorization");
  const REFRESH_TOKEN = Cookies?.get("RefreshToken");

  if (ACCESS_TOKEN && REFRESH_TOKEN) {
    window.location.reload();
    Cookies.remove("Authorization");
    Cookies.remove("RefreshToken");
  }

  return (
    <div className={st.page}>
        <Main1 />
        <Main2 />
        <Main3 />
    </div>
  );
}
