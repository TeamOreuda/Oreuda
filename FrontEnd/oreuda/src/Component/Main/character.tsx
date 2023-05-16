import Image from "next/image";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

import st from "./character.module.scss";

import { GetCharacter } from "@/Api/Plant/getCharacter";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { redirect } from "next/navigation";

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

  const loadCharacterData = useCallback(async () => {
    try {
      const res = await GetCharacter(ACCESS_TOKEN);
      setCharacterData(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
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
  }, [loadCharacterData]);

  // console.log(isHovered);

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
        {/* {isHovered && (
          <Image
            className={isHovered ? st.hovered : ""}
            src="/images/main/Characterinfo.svg"
            alt=""
            width={24}
            height={24}
          />
        )} */}
      </div>
      <ul className={st.discription}>현재 성장 식물을 나타냅니다</ul>
      <Image
        className={st.character}
        src={`/images/character/${characterData?.name}.svg`}
        alt=""
        width={320}
        height={320}
      />
    </div>
  );
}
