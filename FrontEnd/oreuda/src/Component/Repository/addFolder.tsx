"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Folder } from "./folder";
import st from "./addFolder.module.scss";
import fontColor from "../../Style/repository/folderColor.module.scss";

import { AddFolderAxios } from "@/Api/Folders/addFolder";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetBasicFolder } from "@/Api/Folders/getBasicFolder";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

export default function AddFolder(props: {
  clickModal: () => void;
  folderList: Folder[];
  loadFolderList: () => Promise<void>;
}) {
  const { clickModal, loadFolderList, folderList } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [repositoryListData, setRepositoryListData] = useState<{ id: number; name: string }[]>();

  const colorList = ["yellow", "orange", "red", "green", "blue", "purple", "black"];

  useEffect(() => {
    const loadRepositoryList = async () => {
      try {
        const res = await GetBasicFolder(ACCESS_TOKEN);
        setRepositoryListData(res.data);
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
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
    };
    loadRepositoryList();
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const addFolderList = async () => {
    try {
      await AddFolderAxios(ACCESS_TOKEN, folderName, folderColor, checkedItems);
    } catch (err: any) {
      // console.log(err);

      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
        try {
          AddFolderAxios(token.data.Authorization, folderName, folderColor, checkedItems);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const currentIndex = checkedItems.indexOf(value);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(value);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  // 폴더 공백 확인 함수
  const makeFolder = async (folderName: string, folderColor: string, checkedItems: string[]) => {
    if (folderName == "") {
      alert("폴더명을 입력해주세요");
    } else if (
      folderList?.filter((folder) => {
        return folder.name === folderName;
      }).length !== 0
    ) {
      alert("중복된 폴더명입니다");
    } else if (folderName.length > 20) {
      alert("폴더명은 20글자를 넘길 수 없습니다");
    } else if (folderColor == "") {
      alert("폴더 색상을 선택해주세요");
    } else if (checkedItems.length == 0) {
      alert("함께 옮길 레포지토리를 1개 이상 선택해주세요");
    } else {
      await addFolderList();
      await loadFolderList();
      clickModal();
    }
  };

  return (
    <div className={st.modalBox} onClick={clickModal}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <Image src="/images/folder/white.svg" alt="" width={48} height={48} />
          <button onClick={() => makeFolder(folderName, folderColor, checkedItems)}>확인</button>
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
        <p>
          추가할 레포지토리 ({checkedItems.length}/{repositoryListData?.length})
        </p>
        <div className={st.checkItem}>
          {repositoryListData?.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={item.id}
                checked={checkedItems.indexOf(String(item.id)) !== -1}
                onChange={handleCheckboxChange}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
