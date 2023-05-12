import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import st from "./layout.module.scss";
import { Providers } from "@/store/provider";

import { GetProfile } from "@/Api/Users/getProfile";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

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
    if (children.props.childProp.segment === "landing")
      return (
        <html lang="kr">
          <body className={st.body}>
            <Providers>{children}</Providers>
          </body>
        </html>
      );

    {
      /* 로그인이 되어있다면 */
    }

    const cookieStore = cookies();
    const ACCESS_TOKEN = cookieStore.get("Authorization")?.value;
    const REFRESH_TOKEN = cookieStore.get("RefreshToken")?.value;
    const userProfile = await GetProfile(ACCESS_TOKEN)
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
              return await GetProfile(res.data.Authorization).then((res) => {
                return res.data;
              });
            })
            .catch(() => {
              // redirect("/landing");
            });
        }
      });

    return (
      <html lang="kr">
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body className={st.body}>
          <nav className={st.nav}>
            <div>
              <header className={st.header}>
                <Image
                  className={st.img}
                  src="/images/nav/navImg.svg"
                  alt=""
                  width={36}
                  height={36}
                />
                O R E U D A
              </header>
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
            </div>
            <ul>
              <Link href="/landing" className={st.link}>
                <Image
                  className={st.img}
                  src={userProfile}
                  alt=""
                  width={24}
                  height={24}
                />
                로그아웃
              </Link>
            </ul>
          </nav>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }
}
