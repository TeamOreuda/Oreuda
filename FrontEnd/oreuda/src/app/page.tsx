import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";

import { GetUser } from "@/Api/Users/getUsers";
import { GetCharacter } from "@/Api/Plant/getCharacter";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetCharacterGraph } from "@/Api/Plant/getCharacterGraph";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default async function Home() {
  const cookieStore = cookies();
  const ACCESS_TOKEN = cookieStore.get("Authorization")?.value;
  const REFRESH_TOKEN = cookieStore.get("RefreshToken")?.value;

  const userData = await GetUser(ACCESS_TOKEN)
    .then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.response?.status == 401) {
        return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
          .then(async (res) => {
            saveCookiesAndRedirect(
              res.data.Authorization,
              res.data.RefreshToken
            );
            return await GetUser(res.data.Authorization).then((res) => {
              return res.data;
            });
          })
          .catch(() => {
            // redirect("/landing");
          });
      }
    });

  const characterData = await GetCharacter(ACCESS_TOKEN)
    .then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.response?.status == 401) {
        return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
          .then(async (res) => {
            await saveCookiesAndRedirect(
              res.data.Authorization,
              res.data.RefreshToken
            );
            return await GetCharacter(ACCESS_TOKEN).then((res) => {
              return res.data;
            });
          })
          .catch(() => {
            // redirect("/landing");
          });
      }
    });

  const charactergraph = await GetCharacterGraph(ACCESS_TOKEN)
    .then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.response?.status == 401) {
        return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
          .then(async (res) => {
            await saveCookiesAndRedirect(
              res.data.Authorization,
              res.data.RefreshToken
            );
            return await GetCharacterGraph(ACCESS_TOKEN).then((res) => {
              return res.data;
            });
          })
          .catch(() => {
            // redirect("/landing");
          });
      }
    });

  return (
    <div className={st.body}>
      <Statistic userData={userData} />
      <div className={st.character}>
        <Character characterData={characterData} />
        <CharacterGraph charactergraph={charactergraph} />
      </div>
    </div>
  );
}
