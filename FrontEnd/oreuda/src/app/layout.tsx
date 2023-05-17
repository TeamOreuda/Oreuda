import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import st from "./layout.module.scss";
import { Providers } from "@/store/provider";

import { GetProfile } from "@/Api/Users/getProfile";
import { GetCharacter } from "@/Api/Plant/getCharacter";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookies } from "@/Api/Oauth/saveCookies";

interface NavList {
  moveTo: string;
  imageName: string;
  name: string;
}

const navList: NavList[] = [
  {
    moveTo: "/",
    imageName: "home",
    name: "홈",
  },
  {
    moveTo: "/repository",
    imageName: "folder",
    name: "레포지토리",
  },
  {
    moveTo: "/readme",
    imageName: "document",
    name: "리드미",
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (children && typeof children === "object" && "props" in children) {
    // 로그인이 되어있지 않다면
    if (
      children.props.childProp.segment === "landing" ||
      children.props.childProp.segment === "oauth2"
    ) {
      return (
        <html lang="kr">
          <body className={st.body}>
            <Providers>{children}</Providers>
          </body>
        </html>
      );
    } else {
      /* 로그인이 되어있다면 */

      const cookieStore = cookies();
      const ACCESS_TOKEN = cookieStore.get("Authorization")?.value;
      const REFRESH_TOKEN = cookieStore.get("RefreshToken")?.value;

      // const userProfile = await GetProfile(ACCESS_TOKEN)
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .catch(async (err) => {
      //     if (err.response?.status == 401) {
      //       return await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN).then(
      //         async (res) => {
      //           saveCookies(res.data.Authorization, res.data.RefreshToken);
      //           try {
      //             return await GetProfile(res.data.Authorization).then(
      //               (res) => {
      //                 return res.data;
      //               }
      //             );
      //           } catch {
      //             redirect("/landing");
      //           }
      //         }
      //       );
      //     } else {
      //       redirect("/landing");
      //     }
      //   });
      //
      // const characterData = await GetCharacter(ACCESS_TOKEN)
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .catch(async (err) => {
      //     if (err.response?.status == 401) {
      //       return await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN).then(
      //         async (res) => {
      //           saveCookies(res.data.Authorization, res.data.RefreshToken);
      //           try {
      //             return await GetCharacter(res.data.Authorization).then(
      //               (res) => {
      //                 return res.data;
      //               }
      //             );
      //           } catch {
      //             redirect("/landing");
      //           }
      //         }
      //       );
      //     } else {
      //       redirect("/landing");
      //     }
      //   });
      return (
        <html lang="kr">
          <Head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          </Head>
          <body className={st.body}>
            <nav className={st.nav}>
              <div>
                <Link href="/" className={st.header}>
                  <Image
                    className={st.img}
                    src="/images/nav/navImg.svg"
                    alt=""
                    width={36}
                    height={36}
                  />
                  O R E U D A
                </Link>
                {navList.map((e: NavList) => {
                  return (
                    <ul key={e.name}>
                      <Link href={e.moveTo} className={st.link}>
                        <Image
                          className={st.img}
                          src={`/images/nav/${e.imageName}.svg`}
                          alt=""
                          width={24}
                          height={24}
                        />
                        {e.name}
                      </Link>
                    </ul>
                  );
                })}
                {/*<Image*/}
                {/*  className={st.characterImg}*/}
                {/*  src={`/images/character/${characterData?.name}.svg`}*/}
                {/*  alt=""*/}
                {/*  width={144}*/}
                {/*  height={144}*/}
                {/*  priority*/}
                {/*/>*/}
                <ul>
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfenPmbzW6hablBx_67BMY5AECAXep2SAHcm3JgQoSkQCMpJQ/viewform"
                    className={st.link}
                  >
                    피드백 하러가기
                  </Link>
                </ul>
              </div>

              <ul>
                {/*<Link href="/landing" className={st.link}>*/}
                {/*  <Image*/}
                {/*    className={st.logout}*/}
                {/*    src={userProfile}*/}
                {/*    alt=""*/}
                {/*    width={32}*/}
                {/*    height={32}*/}
                {/*  />*/}
                {/*  로그아웃*/}
                {/*</Link>*/}
              </ul>
            </nav>
            <Providers>{children}</Providers>
          </body>
        </html>
      );
    }
  }
}
