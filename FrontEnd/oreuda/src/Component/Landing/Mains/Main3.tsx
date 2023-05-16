"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "../Landing.module.scss";
import bt from "./login_buttons.module.scss";
import st from "./Main3.module.scss";

export default function Main3() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        <div className={st.layout_left}>
          <Image
            data-position={1}
            data-name={1}
            src={`images/landing/main3/Stack.svg`}
            alt="스택"
            width={600}
            height={545}
            draggable={false}
            priority
          />
          <Image
            data-position={1}
            data-name={1}
            src={`images/landing/main3/Finger.gif`}
            alt="폴더"
            width={32}
            height={32}
            draggable={false}
            priority
          />
        </div>
        <div className={st.layout_right}>
          {/* 로그인 버튼들 */}
          <div className={bt.buttons}>
            <div className={bt.button}>
              <Link href={`${process.env.NEXT_PUBLIC_LOGIN_URL}`}>
                <div className={bt.github}>
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
            <div className={bt.button}>
              <Link
                href="https://chrome.google.com/webstore/detail/oreuda/hooeinlffeekoieamkdbbphnjmclpdmp?hl=ko"
                target="_black"
              >
                <div className={bt.extension}>
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
          <div className={st.main}>
            <div className={st.main_title}>
              <span className={st.highlight}>리드미</span>를 작성해보세요
            </div>
            <div className={st.main_content}>
              Git Hub에 프로필을 사용할 리드미를<br></br>GUI를 활용하여 간단하게
              작성해보세요!
              <br />
              남들에게 자신을 알리기 좋은 방법입니다.
            </div>
          </div>
          {/* sub content */}
          <div className={st.sub}>
            <div className={st.sub_title}>작성을 다했다면!?</div>
            <div className={st.sub_content}>
              드래그를 해서 배치를 정하면 끝!
              <br />
              README.md 파일을 추출/복사하여
              <br />
              깃헙 리드미에 적용해보세요.
            </div>
          </div>
          {/* buttons */}
          <div className={st.img}></div>
        </div>
      </div>
    </>
  );
}
