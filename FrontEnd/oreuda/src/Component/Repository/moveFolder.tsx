"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import st from "./addFolder.module.scss";
import fontColor from "../../Style/repository/folderColor.module.scss";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import { useParams } from "next/navigation";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { AddFolderAxios } from "@/Api/Folders/addFolder";
import { GetBasicFolder } from "@/Api/Folders/getBasicFolder";
import { MoveRepository } from "@/Api/Repository/moveRepository";

export default function AddFolder(props: {
  clickModal: any;
  folderId: number;
  filtering: { id: number; value: string; name: string };
}) {
  const { clickModal, folderId, filtering } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("");
  const [moveFolderId, setMoveFolderId] = useState<number>();
  const [repositoryListData, setRepositoryListData] = useState<{ id: number; name: string }[]>();

  const colorList = ["yellow", "orange", "red", "green", "blue", "purple", "black"];

  useEffect(() => {
    const loadRepositoryList = async () => {
      try {
        const res = await GetBasicFolder(ACCESS_TOKEN);
        setRepositoryListData(res.data);
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
          const res = await GetBasicFolder(ACCESS_TOKEN);
          setRepositoryListData(res.data);
        }
      }
    };
    loadRepositoryList();
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const MoveRepossitory = async () => {
    // if (moveFolderId)
    //   try {
    //     await MoveRepository(ACCESS_TOKEN, folderId, filtering.value, moveFolderId, repositories);
    //   } catch (err: any) {
    //     if (err.response?.status == 401) {
    //       const token = await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
    //       saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
    //       await MoveRepository(ACCESS_TOKEN, folderId, filtering.value, moveFolderId, repositories);
    //     }
    //   }
  };

  // 폴더 공백 확인 함수
  const makeFolder = (moveFolderId: string) => {
    if (moveFolderId == "") {
      alert("이동할 폴더를 1개 선택해주세요");
    } else {
      MoveRepossitory();
      clickModal();
    }
  };

  return (
    <div className={st.modalBox} onClick={clickModal}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <Image src="/images/folder/white.svg" alt="" width={48} height={48} />
          {/* <button onClick={() => makeFolder(moveFolderId)}>확인</button> */}
        </div>

        <p>이동할 폴더</p>
        <div className={st.checkItem}>
          {repositoryListData?.map((item, index) => (
            <div key={index}>
              <input
                type="radio"
                value={item.id}
                // checked={moveFolderId.indexOf(String(item.id)) !== -1}
                // onChange={setMoveFolderId()}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
