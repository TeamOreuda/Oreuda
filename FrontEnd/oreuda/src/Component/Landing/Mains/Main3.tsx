"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "../Landing.module.scss";
import st from "./Main2.module.scss";

export default function Main3() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        <div className={st.layoutLeft}></div>
        <div className={st.layoutRight}>
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
                    width={32}
                    height={32}
                    draggable={false}
                    priority
                  />
                  &nbsp; 로그인
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
                    width={32}
                    height={32}
                    draggable={false}
                    priority
                  />
                  &nbsp; 다운로드
                </div>
              </Link>
            </div>
          </div>

          {/* main content */}
          <div ></div>
          {/* sub content */}
          <div ></div>
          {/* buttons */}
          <div ></div>

        </div>
      </div>
    </>
  );
}
