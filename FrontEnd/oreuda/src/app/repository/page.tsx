"use client";

import Image from "next/image";
import Cookies from "js-cookie";
// import { hotjar } from "react-hotjar";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import st from "./page.module.scss";
import Folder from "@/Component/Folder/folder";
import AddFolder from "@/Component/Folder/addFolder";

import { DeleteFolder } from "@/Api/Folders/deleteFolder";
import { GetFolderList } from "@/Api/Folders/getFolderList";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetBasicFolder } from "@/Api/Folders/getBasicFolder";
import { saveCookies } from "@/Api/Oauth/saveCookies";

export default function Repository() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [repositoryListData, setRepositoryListData] =
    useState<{ id: number; name: string }[]>();

  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development") {
  //     hotjar.initialize(3483558, 6);
  //   }
  // }, []);

  const loadFolderList = useCallback(async () => {
    try {
      const res = await GetFolderList(ACCESS_TOKEN);
      setFolderList(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          await GetFolderList(token.data.Authorization);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
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
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetBasicFolder(token.data.Authorization);
          setRepositoryListData(res.data);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
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
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          await DeleteFolder(token.data.Authorization, checkedItems);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  };

  const clickDelete = async () => {
    if (showDelete && checkedItems.length > 0) {
      if (
        confirm(
          "내부에 레포지토리가 있으면 기본폴더로 이동됩니다. 삭제하시겠습니까?"
        ) == true
      ) {
        await deleteFolderList();
        await loadFolderList();
        setCheckedItems([]);
        alert("삭제되었습니다");
      } else {
        setCheckedItems([]);
        alert("취소되었습니다");
      }
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
        <AddFolder
          clickModal={clickModal}
          loadFolderList={loadFolderList}
          folderList={folderList}
        />
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
