"use clienet";

import Image from "next/image";
import axios from "axios";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";

import st from "./statistic.module.scss";
import { useState } from "react";

interface gitHubStatistic {
  title: string;
  count?: number;
  language?: string;
  howCount?: string;
  imageName: string;
}

export default function Statistic() {
  const cookieStore = cookies();
  const [userData, setUserData] = useState({
    commitCnt: 0,
    repositoryCnt: 0,
    streakMax: 0,
    mainLanguage: "없음",
    nickname: "사용자",
  });
  const ACCESS_TOKEN = cookieStore.get("Authorization")?.value;
  const REFRESH_TOKEN = cookieStore.get("RefreshToken")?.value;

  const getUserData = async () => {
    const data = await axios
      .get("http://192.168.31.233:9000/api/v1/users", {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch(async (err) => {
        if (err.response.status == 401) {
          return await axios
            .post(
              "http://192.168.31.233:9000/api/v1/auth/refresh",
              {},
              {
                headers: {
                  Authorization: ACCESS_TOKEN,
                  RefreshToken: REFRESH_TOKEN,
                },
              }
            )

            .then(async (res) => {
              // 토큰 쿠키에 저장하기
              console.log(111111111);
              console.log(res.data.Authorization);
              console.log(res.data.RefreshToken);

              if (res.data.Authorization) {
                setCookie("Authorization", res.data.Authorization, {
                  path: "/",
                  httpOnly: false,
                  secure: false,
                  sameSite: "none",
                });
              }
              if (res.data.RefreshToken) {
                setCookie("RefreshToken", res.data.RefreshToken, {
                  path: "/",
                  httpOnly: false,
                  secure: false,
                  sameSite: "none",
                });
              }
              return await axios
                .get("http://192.168.31.233:9000/api/v1/users", {
                  headers: {
                    Authorization: res.data.Authorization,
                  },
                })
                .then((res) => {
                  return res.data;
                });
            })

            .catch(() => {
              redirect("/login");
            });
        }
      });
    setUserData(data);
  };

  getUserData();

  const gitHubStatistic: gitHubStatistic[] = [
    {
      title: "총 커밋 수",
      count: userData?.commitCnt,
      howCount: "개",
      imageName: "target",
    },
    {
      title: "레포지토리 수",
      count: userData?.repositoryCnt,
      howCount: "개",
      imageName: "folder",
    },
    {
      title: "최고 잔디 스트릭",
      count: userData?.streakMax,
      howCount: "일",
      imageName: "grass",
    },
    {
      title: "주 언어",
      language: userData?.mainLanguage,
      imageName: "typescript",
    },
  ];

  return (
    <div>
      <ul className={st.header}>
        <span>{userData?.nickname}</span>
        님의 깃헙을 분석해 봤어요.
      </ul>
      <div className={st.statistic}>
        {gitHubStatistic.map((e) => (
          <div key={e.title} className={st.box}>
            <div>
              <ul>{e.title}</ul>
              <span>
                {e.count} <span>{e.howCount}</span>
              </span>
              <span>{e.language}</span>
            </div>
            <Image src={`/images/main/${e.imageName}.svg`} alt="" width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
