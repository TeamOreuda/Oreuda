"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { hotjar } from "react-hotjar";

import { redirect } from "next/navigation";

import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph, { Charactergraph } from "@/Component/Main/charactergraph";

import { GetUser } from "@/Api/Users/getUsers";
import { GetCharacter } from "@/Api/Plant/getCharacter";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetCharacterGraph } from "@/Api/Plant/getCharacterGraph";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default function Home() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [userData, setUserData] = useState();
  const [characterData, setCharacterData] = useState<{ id: number; name: string }>({
    id: 0,
    name: "oreuda",
  });
  const [characterGraph, setCharacterGraph] = useState<Charactergraph[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      hotjar.initialize(3483558, 6);
    }
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const res = await GetUser(ACCESS_TOKEN);
      setUserData(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetUser(token.data.Authorization);
          setUserData(res.data);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const loadCharacterData = useCallback(async () => {
    try {
      const res = await GetCharacter(ACCESS_TOKEN);
      setCharacterData(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetCharacter(token.data.Authorization);
          setCharacterData(res.data);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const loadCharacterGraphData = useCallback(async () => {
    try {
      const res = await GetCharacterGraph(ACCESS_TOKEN);
      setCharacterGraph(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetCharacterGraph(token.data.Authorization);
          setCharacterGraph(res.data);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    loadUserData();
    loadCharacterData();
    loadCharacterGraphData();
  }, [ACCESS_TOKEN, REFRESH_TOKEN, loadUserData, loadCharacterData, loadCharacterGraphData]);

  return (
    <div className={st.body}>
      <Statistic userData={userData} />
      <div className={st.character}>
        <Character characterData={characterData} />
        <CharacterGraph charactergraph={characterGraph} />
      </div>
    </div>
  );
}
