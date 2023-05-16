"use client";

import Cookies from "js-cookie";
import { useState } from "react";

import st from "./editFolder.module.scss";
import fontColor from "../../Style/repository/folderColor.module.scss";

import { EditFolderInfo } from "@/Api/Folders/editFolderInfo";
import Image from "next/image";

export default function EditFolder(props: { folderId: number; changeFolder: any }) {
  const { folderId, changeFolder } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("");

  const editInfo = async (
    ACCESS_TOKEN: any,
    id: number,
    folderName: string,
    folderColor: string
  ) => {
    await EditFolderInfo(ACCESS_TOKEN, id, folderName, folderColor);
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
