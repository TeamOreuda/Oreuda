"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import { redirect } from "next/navigation";

import st from "./page.module.scss";
import Folder from "@/Component/Repository/folder";
import AddFolder from "@/Component/Repository/addFolder";

import { GetFolderList } from "@/Api/Folders/getFolderList";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default async function Repository() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  console.log("page access", ACCESS_TOKEN);

  const clickModal = () => {
    setShowModal(!showModal);
  };

  const clickDelete = () => {
    setShowDelete(!showDelete);
  };

  const folderListData = await GetFolderList(ACCESS_TOKEN)
    .then((res) => {
      console.log("res.date", res.data);
      return res.data;
    })
    .catch(async (err) => {
      if (err.response?.status == 401) {
        return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
          .then(async (res) => {
            await saveCookiesAndRedirect(res.data.Authorization, res.data.RefreshToken);
            return await GetFolderList(res.data.Authorization).then((res) => {
              return res.data;
            });
          })

          .catch(() => {
            redirect("/");
          });
      }
    });

  console.log("folderListData", folderListData);

  return (
    <div className={st.body}>
      <div className={st.button}>
        {showDelete ? null : (
          <button onClick={clickModal}>
            폴더 추가
            <Image
              className={st.img}
              src="images/repository/plus.svg"
              alt="plus"
              width={16}
              height={16}
            />
          </button>
        )}
        <button onClick={clickDelete}>
          {showDelete ? "확  인" : "폴더 삭제"}
          <Image
            className={st.img}
            src="images/repository/trash.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
      </div>
      <hr />
      {/* {showModal && <AddFolder clickModal={clickModal} />} */}
      {/* <Folder
        clickDelete={showDelete}
        folderListData={folderListData}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      /> */}
    </div>
  );
}
