"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import pg from "../Landing.module.scss";
import st from "./Main1.module.scss";

import { getRegisteredUser } from "@/Api/Users/getRegisteredUser";

export default function Main1() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCnt, setUserCnt] = useState(0);
  const [mountainEye, setMountainEye] = useState(false);
  const [mountainEyeNumber, setMountainEyeNumber] = useState(0);
  const [seconds, setSeconds] = useState(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const temp = Math.floor(Math.random() * 10);
      // setMountainEyeNumber(temp);
      if (temp === 7 || temp === 5 || temp === 3) {
        setMountainEye(prevMountainEye => !prevMountainEye);
      }
      // console.log(temp)
      // console.log(mountainEye)
    }, 400);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 정리
    };
  }, []);

  useEffect(() => {
    getRegisteredUser().then((response) => {
      // console.log(response.data);
      setUserCnt(response.data);
      setIsLoading(true);
    });
  }, []);

  
  if (isLoading) {
    return (
      <div className={`${pg.page} ${st.layout}`} id="page">
        {/* 텍스트 영역 */}
        <div className={st.content}>
          <div>
            <div className={st.title}>Oreuda</div>
            <div className={st.intro}>
              <div>
                오르다 서비스로 깃헙을 커스텀하고 자신을 나타내고<br></br>
                성장해보세요! 자신을 성장시켜보세요!
              </div>
              <div className={st.userCnt}>
                <Image
                  className={st.soil}
                  data-position={1}
                  data-name={1}
                  src={`/images/landing/main1/Soil.svg`}
                  alt="폴더"
                  width={35}
                  height={32}
                  draggable={false}
                  priority
                />{" "}
                &nbsp; 함께 성장하고 있는 오르 수 <b>{userCnt}명</b>
              </div>
            </div>
          </div>
          <div className={st.buttons}>
            <div className={st.button}>
              <Link href={`${process.env.NEXT_PUBLIC_LOGIN_URL}`}>
                <div className={st.github}>
                  <Image
                    data-position={1}
                    data-name={1}
                    src={`/images/landing/main1/Github.svg`}
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
                    src={`/images/landing/main1/Google.svg`}
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
              src={`/images/landing/main1/Cloud.svg`}
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
              src={`/images/landing/main1/Sun.svg`}
              alt="해"
              width={500}
              height={500}
              priority
              draggable={false}
            />
          </div>
          <div className={st.cloud2}>
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main1/Cloud.svg`}
              alt="구름"
              width={600}
              height={500}
              priority
              draggable={false}
            />
          </div>
          <div className={st.mountain}>
            {mountainEye ? (
              <Image
                data-position={1}
                data-name={1}
                src={`/images/landing/main1/Mountain.svg`}
                className = {st.mountainOpen}
                alt="산"
                width={1200}
                height={800}
                priority
                draggable={false}
              />
            ) : (
              <Image
                data-position={1}
                data-name={1}
                src={`/images/landing/main1/Mountain_close.svg`}
                className = {st.mountainClose}

                alt="산"
                width={1200}
                height={800}
                priority
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
