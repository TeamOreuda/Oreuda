"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "../Landing.module.scss";
import st from "./Main2.module.scss";

export default function Main2() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        {/* <div></div> */}
        {/* 타원 영역 */}
        <div className={st.content}>
          <div>깃 허브를 정리해보세요!</div>
          <div>
            폴더를만들어서 레포지토리를 관리하고, 정리해보세요.
            <br />
            필요한 레포지토리를 한번에 찾을 수 있을 거에요!
          </div>
        </div>

        {/* 로그인 버튼들 */}
        <div className={st.buttons}>
          <div className={st.button}>
            <Link href={`${process.env.NEXT_PUBLIC_LOGIN_URL}`}>
              <div className={st.github}>
                <Image
                  data-position={1}
                  data-name={1}
                  src={`images/landing/main1/github.svg`}
                  alt="폴더"
                  width={44}
                  height={44}
                  draggable={false}
                  priority
                />
                &nbsp; Github 계정으로 로그인
              </div>
            </Link>
          </div>
          <div className={st.button}>
            <Link
              href="https://chrome.google.com/webstore/detail/oreuda/hooeinlffeekoieamkdbbphnjmclpdmp?hl=ko"
              target="_black"
            >
              <div className={st.extension}>
                <Image
                  data-position={1}
                  data-name={1}
                  src={`images/landing/main1/Google.svg`}
                  alt="폴더"
                  width={44}
                  height={44}
                  draggable={false}
                  priority
                />
                &nbsp; Chrome Extension 다운로드
              </div>
            </Link>
          </div>
        </div>

        {/* 사진 영역 */}
          <Image
            data-position={1}
            data-name={1}
            src={`images/landing/back_ellipse.svg`}
            className={st.ellipse}
            alt="폴더"
            width={1000}
            height={1370}
            draggable={false}
            priority
          />
        {/* <div></div> */}
      </div>
    </>
  );
}
