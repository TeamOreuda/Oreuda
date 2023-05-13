"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import st from "./page.module.scss";
import Folder from "@/Component/Repository/folder";
import AddFolder from "@/Component/Repository/addFolder";

import { DeleteFolder } from "@/Api/Folders/deleteFolder";
import { GetFolderList } from "@/Api/Folders/getFolderList";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetBasicFolder } from "@/Api/Folders/getBasicFolder";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default function Repository() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [repositoryListData, setRepositoryListData] =
    useState<{ id: number; name: string }[]>();

  const loadFolderList = useCallback(async () => {
    try {
      const res = await GetFolderList(ACCESS_TOKEN);
      setFolderList(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
        try {
          await GetFolderList(ACCESS_TOKEN);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const loadRepositoryList = useCallback(async () => {
    try {
      const res = await GetBasicFolder(ACCESS_TOKEN);
      setRepositoryListData(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
        try {
          const res = await GetBasicFolder(ACCESS_TOKEN);
          setRepositoryListData(res.data);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    loadFolderList();
    loadRepositoryList();
  }, [ACCESS_TOKEN, REFRESH_TOKEN, loadFolderList, loadRepositoryList]);

  const clickModal = () => {
    if (repositoryListData?.length == 0) {
      alert("기본 폴더에 레포지토리가 없어 폴더를 만들 수 없습니다.");
    } else {
      setShowModal(!showModal);
    }
  };

  const deleteFolderList = async () => {
    try {
      await DeleteFolder(ACCESS_TOKEN, checkedItems);
    } catch (err: any) {
      console.log("delete", err);

      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(
          token.data.Authorization,
          token.data.RefreshToken
        );
        try {
          await DeleteFolder(token.data.Authorization, checkedItems);
        } catch (error) {
          // redirect("/landing")
        }
      } else {
        // redirect("/landing")
      }
    }
  };

  const clickDelete = async () => {
    if (showDelete) {
      await deleteFolderList();
      await loadFolderList();
      setCheckedItems([]);
    }
    setShowDelete(!showDelete);
  };

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
      {showModal && (
        <AddFolder clickModal={clickModal} loadFolderList={loadFolderList} />
      )}
      <Folder
        clickDelete={showDelete}
        folderList={folderList}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        loadFolderList={loadFolderList}
      />
    </div>
  );
}
