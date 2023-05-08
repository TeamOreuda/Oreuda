import axios from "axios";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { Provider } from "react-redux";

import st from "./page.module.scss";
import Statistic from "@/Component/Main/statistic";
import Character from "@/Component/Main/character";
import CharacterGraph from "@/Component/Main/charactergraph";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";

export default async function Home() {
  const cookieStore = cookies();
  const ACCESS_TOKEN = cookieStore.get("Authorization")?.value;
  const REFRESH_TOKEN = cookieStore.get("RefreshToken")?.value;

  const data = await axios
    .get("https://oreuda.kr/api/v1/users", {
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
            "https://oreuda.kr/api/v1/auth/refresh",
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
              .get("https://oreuda.kr/api/v1/users", {
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
  return (
    // <Provider store={store}>
    <div className={st.body}>
      <Statistic userData={data} />
      <div className={st.character}>
        <Character />
        <CharacterGraph />
      </div>
    </div>
    // </Provider>
  );
}
