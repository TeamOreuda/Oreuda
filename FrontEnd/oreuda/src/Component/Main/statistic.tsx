"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import st from "./statistic.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { setGithubId } from "@/store/modules/readme";

import { GetUser } from "@/Api/Users/getUsers";
import { RefreshData } from "@/Api/Data/refreshData";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

interface gitHubStatistic {
  title: string;
  count?: number;
  language?: string;
  howCount?: string;
  imageName: string;
}

interface UserData {
  nickname: string;
  commitCnt: number;
  repositoryCnt: number;
  streakMax: number;
  mainLanguage: string;
  updateTime: string;
}

export default function Statistic() {
  const dispatch = useAppDispatch();
  const refreshIconRef = useRef<HTMLImageElement>(null);
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [userData, setUserData] = useState<UserData>();

  const loadUserData = useCallback(async () => {
    try {
      const res = await GetUser(ACCESS_TOKEN);
      setUserData(res.data);
      // dispatch(setGithubId(res.data.nickname));
    } catch (e: any) {
      if (e.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
        const res = await GetUser(token.data.Authorization);
        setUserData(res.data);
        // dispatch(setGithubId(res.data.nickname));
      } else {
        redirect("/landing");
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN, dispatch]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

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
      imageName: userData?.mainLanguage || "language",
    },
  ];

  const refreshHandler = async (e: React.MouseEvent<HTMLImageElement>) => {
    const rotateInterval = setInterval(() => {
      if (refreshIconRef.current) {
        refreshIconRef.current.style.transform = `rotate(${(
          Number(
            refreshIconRef.current.style.transform.replace(/[^0-9]/g, "")
          ) + 10
        ).toString()}deg)`;
      }
    }, 1000 / (360 / 10));
    try {
      await RefreshData(ACCESS_TOKEN);
      await loadUserData();
      clearInterval(rotateInterval);
      if (refreshIconRef.current) {
        refreshIconRef.current.style.transform = `rotate(0deg)`;
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
        await RefreshData(token.data.Authorization);
        await loadUserData();
        clearInterval(rotateInterval);
        if (refreshIconRef.current) {
          refreshIconRef.current.style.transform = `rotate(0deg)`;
        }
      }
    }
  };

  useEffect(() => {
    dispatch(setGithubId(userData?.nickname));
  }, []);

  return (
    <div>
      <ul className={st.header}>
        <span>{userData?.nickname}</span>
        님의 깃헙을 분석해 봤어요.
        <Image
          src="/images/main/refresh.svg"
          alt="갱신"
          width={32}
          height={32}
          className={st.refresh}
          onClick={refreshHandler}
          ref={refreshIconRef}
        />
        <span className={st.lastUpdated}>
          마지막 업데이트
          <br /> {userData?.updateTime.replace("T", " ").slice(0, 16)}
        </span>
      </ul>
      <div className={st.statistic}>
        {gitHubStatistic.map((e) => (
          <div key={e.title} className={st.box}>
            <div>
              <ul>{e.title}</ul>
              <span className={st.count}>
                {e.count} <span>{e.howCount}</span>
              </span>
              {e.language && (
                <span
                  className={e.language.length > 6 ? st.language : st.count}
                >
                  {e.language}
                </span>
              )}
            </div>
            <Image
              src={`/images/main/${e.imageName}.svg`}
              alt="주언어"
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
