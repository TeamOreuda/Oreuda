"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "../Landing.module.scss";
import st from "./Main2.module.scss";

import Folders from "./Folders";
import LoginButtons from "./LoginButtons";

export default function Main2() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        {/* 타원 영역 */}
        <div className={st.content}>
          <div className={st.title}>
            깃 허브를&nbsp;
            <span className={st.emphasis}>
              <b>정리</b>
            </span>
            해보세요!
          </div>
          <br></br>
          <br></br>
          <div className={st.intro}>
            폴더를 만들어서 레포지토리를 관리하고, 정리해 보세요.
            <br />
            필요한 레포지토리를 한 번에 찾을 수 있을 거예요!
          </div>
        </div>

        {/* 로그인 버튼들 */}
        <LoginButtons />
        {/* 사진 영역 */}
        {/* 타원 */}
        <Folders />
      </div>
    </>
  );
}
