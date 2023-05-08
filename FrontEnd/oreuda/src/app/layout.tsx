import Link from "next/link";
import Image from "next/image";

import st from "./layout.module.scss";
import { Providers } from "@/store/provider";

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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (children && typeof children === "object" && "props" in children) {
    console.log("현재 페이지 : " + children.props.childProp.segment);
    if (children.props.childProp.segment === "landing")
      return (
        <html lang="kr">
          <body className={st.body}>
            <Providers>{children}</Providers>
          </body>
        </html>
      );
  }

  return (
    <html lang="kr">
      <body className={st.body}>
        {/* 로그인이 되어있다면 */}
        <nav className={st.nav}>
          <div>
            <header className={st.header}>
              <Image
                className={st.img}
                src="/images/character/oreuda.svg"
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
            <ul>
              <Link href="/login" className={st.link}>
                <Image
                  className={st.img}
                  src={`/images/nav/logout.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
                로그인
              </Link>
            </ul>
            <ul>
              <Link href="" className={st.link}>
                <Image
                  className={st.img}
                  src="/images/nav/logout.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                로그아웃
              </Link>
            </ul>
          </div>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
