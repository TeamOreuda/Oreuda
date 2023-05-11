"use client";

import Image from "next/image";
import { use, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";

import st from "./page.module.scss";
import Repository from "@/Component/Repository/repository";

import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";

export default async function RepositoryPage() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  // const [moveRepository, setmoveRepository] = useState(false);
  // const [filtering, setFiltering] = useState("recent");

  const folderId = 22;

  console.log();

  // const clickMove = () => {
  //   setmoveRepository(!moveRepository);
  // };

  const repositoryList = await GetRepositoryLst(ACCESS_TOKEN, folderId, "recent")
    .then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.response?.status == 401) {
        return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
          .then(async (res) => {
            await saveCookiesAndRedirect(res.data.Authorization, res.data.RefreshToken);
            return await GetRepositoryLst(ACCESS_TOKEN, folderId, "recent").then((res) => {
              return res.data;
            });
          })

          .catch(() => {
            redirect("/");
          });
      }
    });

  return (
    <div className={st.body}>
      <div className={st.button}>
        {/* <button onClick={clickMove}>
          {moveRepository ? "확 인" : "폴더 이동"}
          <Image
            className={st.img}
            src="/images/repository/send.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button> */}
      </div>
      <hr />
      <Repository clickMove={false} repositoryList={repositoryList} />
    </div>
  );
}
