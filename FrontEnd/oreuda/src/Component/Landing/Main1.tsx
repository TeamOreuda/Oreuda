"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "./Landing.module.scss";
import st from "./Main1.module.scss";

import { getRegisteredUser } from "@/Api/Users/getRegisteredUser";

export default function Main1() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCnt, setUserCnt] = useState(0);
  const [mountainEye, SetMountainEye] = useState(false);
  const [mountainEyeNumber, setMountainEyeNumber] = useState(0);

  useEffect(() => {
    getRegisteredUser().then((response) => {
      console.log(response.data);
      setUserCnt(response.data);
      setIsLoading(true);
    });
  }, []);

//   setInterval(() => {
//     const temp = Math.floor(Math.random() * 100);
//     setMountainEyeNumber(mountainEyeNumber + temp);
//   }, 100);

  if (mountainEyeNumber >= 1000) {
    // console.log(mountainEyeNumber)
    SetMountainEye(true);
    setMountainEyeNumber(0);
    if (mountainEyeNumber >= 1000) {
      SetMountainEye(false);
      setMountainEyeNumber(0);
    }
  }

  if (isLoading) {
    return (
      <div className={`${pg.page} ${st.layout}`}>
        {/* 텍스트 영역 */}
        <div className={st.content}>
          <div className={st.title}>Oreuda</div>
          <div className={st.intro}>
            <div>
              오르다 서비스로 깃헙을 커스텀하고 자신을 나타내고<br></br>
              성장해보세요! 자신을 성장시켜보세요!
            </div>
            <div className={st.userCnt}>
              <Image
                data-position={1}
                data-name={1}
                src={`images/landing/Soil.svg`}
                alt="폴더"
                width={35}
                height={32}
                draggable={false}
                priority
              />{" "}
              &nbsp; 함께 성장하고 있는 오르 수 <b>{userCnt}명</b>
            </div>
          </div>
          <div className={st.buttons}>
            <div className={st.button}>
              <Link href="http://52.79.221.133:8090/oauth2/authorization/github">
                <div className={st.github}>
                  <Image
                    data-position={1}
                    data-name={1}
                    src={`images/landing/github.svg`}
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
                    src={`images/landing/Google.svg`}
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
        </div>
        {/* 사진 영역 */}
        <div className={st.img}>
          <div className={st.cloud1}>
            <Image
              data-position={1}
              data-name={1}
              src={`images/landing/Cloud.svg`}
              alt="구름"
              width={600}
              height={500}
              draggable={false}
            />
          </div>
          <div className={st.sun}>
            <Image
              data-position={1}
              data-name={1}
              src={`images/landing/Sun.svg`}
              alt="해"
              width={500}
              height={500}
              draggable={false}
            />
          </div>
          <div className={st.cloud2}>
            <Image
              data-position={1}
              data-name={1}
              src={`images/landing/Cloud.svg`}
              alt="구름"
              width={600}
              height={500}
              draggable={false}
            />
          </div>
          <div className={st.mountain}>
            {mountainEye ? (
              <Image
                data-position={1}
                data-name={1}
                src={`images/landing/Mountain.svg`}
                alt="산"
                width={1200}
                height={800}
                draggable={false}
              />
            ) : (
              <Image
                data-position={1}
                data-name={1}
                src={`images/landing/Mountain_close.svg`}
                alt="산"
                width={1200}
                height={800}
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
