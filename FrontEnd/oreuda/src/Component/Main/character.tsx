import Image from "next/image";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import st from "./character.module.scss";

import { GetCharacter } from "@/Api/Plant/getCharacter";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { GetCharacterInfo } from "@/Api/Plant/getCharacterInfo";

export default function Character() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [isHovered, setIsHovered] = useState(false);
  const [characterData, setCharacterData] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });
  const [characterInfoData, setCharacterInfoData] = useState<{
    userStats: number;
    nextLevelExp: number;
    nextLevel: string;
  }>({
    userStats: 0,
    nextLevelExp: 0,
    nextLevel: "",
  });

  const loadCharacterInfoData = useCallback(async () => {
    try {
      const res = await GetCharacterInfo(ACCESS_TOKEN);
      setCharacterInfoData(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetCharacterInfo(token.data.Authorization);
          setCharacterInfoData(res.data);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
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
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    loadCharacterData();
    loadCharacterInfoData();
  }, [loadCharacterData, loadCharacterInfoData]);

  return (
    <div>
      <div className={st.header}>
        <ul>나의 성장 식물</ul>
        <Image
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={st.img}
          src="/images/info.svg"
          alt=""
          width={24}
          height={24}
        />
        {isHovered && (
          <Image
            className={isHovered ? st.infohovered : ""}
            src="/images/main/Characterinfo.svg"
            alt=""
            width={24}
            height={24}
          />
        )}
      </div>
      <ul className={st.discription}>
        현재 능력치: {characterInfoData.userStats}
        {characterInfoData.nextLevel !== "MAX" ? (
          <div>
            <Image
              src={`/images/character/${characterInfoData.nextLevel}.svg`}
              alt=""
              width={24}
              height={24}
            />
            <p>까지 남은 능력치: {characterInfoData.nextLevelExp}</p>
          </div>
        ) : (
          "현재 최종레벨에 도달하셨습니다"
        )}
      </ul>
      <Image
        className={st.character}
        src={`/images/character/${characterData?.name}.svg`}
        alt=""
        width={280}
        height={280}
      />
    </div>
  );
}
