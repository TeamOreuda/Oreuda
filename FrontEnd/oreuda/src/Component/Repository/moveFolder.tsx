"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

import st from "./moveFolder.module.scss";
import { Folder } from "@/Component/Folder/folder";

import { GetFolderList } from "@/Api/Folders/getFolderList";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default function MoveFolder(props: {
  closeModal: () => void;
  folderId: number;
  setMoveFolderId: Dispatch<SetStateAction<number>>;
  moveRepository: () => void;
}) {
  const { closeModal, folderId, setMoveFolderId, moveRepository } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [folderList, setFolderList] = useState<{ id: number; name: string }[]>([]);

  const loadFolderList = useCallback(async () => {
    try {
      const res = await GetFolderList(ACCESS_TOKEN);
      setFolderList(res.data.filter((folder: Folder) => folder.id != folderId));
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          await GetFolderList(token.data.Authorization);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN, folderId]);

  useEffect(() => {
    loadFolderList();
  }, [loadFolderList]);

  return (
    <div className={st.modalBox} onClick={closeModal}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <Image src="/images/folder/white.svg" alt="" width={48} height={48} />
          <button onClick={moveRepository}>확인</button>
        </div>

        <p>이동할 폴더</p>
        <div className={st.checkItem}>
          {folderList?.map((folder, index) => (
            <div key={index}>
              <input type="radio" value={folder.id} onChange={() => setMoveFolderId(folder.id)} />
              {folder.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
