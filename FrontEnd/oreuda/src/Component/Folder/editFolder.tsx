"use client";

import Cookies from "js-cookie";
import { useState } from "react";

import st from "./editFolder.module.scss";
import fontColor from "../../Style/repository/folderColor.module.scss";

import { EditFolderInfo } from "@/Api/Folders/editFolderInfo";
import Image from "next/image";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookies } from "@/Api/Oauth/saveCookies";
import { redirect } from "next/navigation";

export default function EditFolder(props: {
  folderId: number;
  changeFolder: any;
  folderName: string;
  setFolderName: any;
  folderColor: string;
  setFolderColor: any;
}) {
  const { folderId, changeFolder, folderName, setFolderName, folderColor, setFolderColor } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const editInfo = async (
    ACCESS_TOKEN: any,
    id: number,
    folderName: string,
    folderColor: string
  ) => {
    try {
      await EditFolderInfo(ACCESS_TOKEN, id, folderName, folderColor);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          await EditFolderInfo(token.data.Authorization, id, folderName, folderColor);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }

    changeFolder();
  };

  const colorList = ["yellow", "orange", "red", "green", "blue", "purple", "black"];

  return (
    <div className={st.modalBox} onClick={changeFolder}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <Image src="/images/folder/white.svg" alt="" width={48} height={48} />
          <button onClick={() => editInfo(ACCESS_TOKEN, folderId, folderName, folderColor)}>
            확인
          </button>
        </div>
        <p>폴더명</p>
        <input
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
          placeholder="폴더명을 입력해주세요"
        />
        <p>색상</p>
        <div>
          {colorList.map((color: string) => {
            return (
              <div
                key={color}
                className={`${fontColor[color]} ${folderColor === color ? st.select : ""}`}
                onClick={() => setFolderColor(color)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
