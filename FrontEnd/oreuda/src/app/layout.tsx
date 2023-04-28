import Link from "next/link";
import Image from "next/image";

import st from "./layout.module.scss";
import { Providers } from "@/store/provider";

const navList: any = [
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
                width={40}
                height={40}
              />
              O R E U D A
            </header>
            {navList.map((e: any) => {
              return (
                <ul key={e.name}>
                  <Link href={`${e.moveTo}`} className={st.link}>
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
