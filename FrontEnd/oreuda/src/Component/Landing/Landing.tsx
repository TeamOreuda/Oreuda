"use client";

import Cookies from "js-cookie";

import st from "./Landing.module.scss";

import LandingHeader from "./LandingHeader";
import LandingRepo from "./LandingRepo";
import PageFormat from "./PageFormat";

import Main1 from "./Main1";
import { useEffect } from "react";

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
      {/* <LandingHeader />
      <PageFormat /> */}
      <Main1 />
    </div>
  );
}
