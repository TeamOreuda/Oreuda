"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import st from "./page.module.scss";
import EditFolder from "@/Component/Folder/editFolder";
import MoveFolder from "@/Component/Repository/moveFolder";
import Repository from "@/Component/Repository/repository";

import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { MoveRepository } from "@/Api/Repository/moveRepository";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import { saveCookies } from "@/Api/Oauth/saveCookies";

interface InnerFolder {
  id: number;
  name: string;
  color: string;
  status: string;
  repositories: any[];
}

export default function RepositoryPage() {
  const params = useParams();
  const folderId = Number(params.folderId);
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [openEdit, setOpenEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [repositoryList, setRepositoryList] = useState<{ id: number, name: string, color: string, state: string, repositories: [] }>({});
  const [innerFolder, setInnerFolder] = useState<InnerFolder>({
    id: 0,
    name: "",
    color: "",
    status: "",
    repositories: [],
  });
  const [moveFolderId, setMoveFolderId] = useState<number>(-1);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [moveRepositoryMode, setMoveRepositoryMode] = useState(false);

  const options = [
    { id: 1, value: "recent", name: "최신순" },
    { id: 2, value: "commit", name: "커밋순" },
    { id: 3, value: "name", name: "이름순" },
    { id: 4, value: "star", name: "별점순" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [filtering, setFiltering] = useState(options[0]);

  const handleOptionClick = (option: any) => {
    setFiltering(option);
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const loadRepositoryList = useCallback(async () => {
    try {
      const res = await GetRepositoryLst(
        ACCESS_TOKEN,
        folderId,
        filtering.value
      );
      setInnerFolder(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetRepositoryLst(
            token.data.Authorization,
            folderId,
            filtering.value
          );
          setInnerFolder(res.data);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN, filtering.value, folderId]);

  useEffect(() => {
    loadRepositoryList();
  }, [loadRepositoryList]);

  const clickModal = () => {
    if (moveRepositoryMode) {
      if (checkedItems?.length == 0) {
        alert("선택하신 레포지토리가 없습니다");
      } else {
        setShowModal(true);
        setMoveRepositoryMode(false);
      }
    } else {
      setMoveRepositoryMode(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMoveFolderId(-1);
    setCheckedItems([]);
  };

  const moveRepository = async () => {
    if (moveFolderId === -1) {
      alert("이동할 폴더를 1개 선택해주세요");
    } else {
      const data = {
        nowFolderId: folderId,
        filtering: filtering.value,
        moveFolderId: moveFolderId,
        repositories: checkedItems,
      };
      try {
        await MoveRepository(ACCESS_TOKEN, data);
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookies(token.data.Authorization, token.data.RefreshToken);
          await MoveRepository(token.data.Authorization, data);
        }
      }
      await loadRepositoryList();
      closeModal();
    }
  };

  const changeFolder = () => {
    if (innerFolder.status === "B") {
      alert("기본 폴더는 수정할 수 없습니다");
    } else {
      setOpenEdit(!openEdit);
    }
  };

  const rollback = () => {
    redirect("/repository");
  };

  return (
    <div className={st.body}>
      <div className={st.folderName}>
        <Image
          src={`/images/repository/left.svg`}
          alt=""
          width={36}
          height={36}
          onClick={rollback}
        />
        {innerFolder.color && (
          <Image
            src={`/images/folder/${innerFolder.color}.svg`}
            alt=""
            width={36}
            height={36}
          />
        )}
        <span>{innerFolder.name}</span>
        <Image
          className={st.editImg}
          src={`/images/repository/editing.svg`}
          alt=""
          width={20}
          height={20}
          onClick={changeFolder}
        />
        {openEdit && (
          <EditFolder folderId={folderId} changeFolder={changeFolder} />
        )}
      </div>
      <div className={st.button}>
        {moveRepositoryMode && (
          <button
            onClick={() => {
              setMoveRepositoryMode(false);
            }}
            className={st.rollbackButton}
          >
            취 소
            <Image
              className={st.img}
              src="/images/repository/send.svg"
              alt="plus"
              width={16}
              height={16}
            />
          </button>
        )}
        <button onClick={clickModal}>
          {moveRepositoryMode ? "확 인" : "레포지토리 이동"}
          <Image
            className={st.img}
            src="/images/repository/send.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={st.dropdown} onClick={toggleDropdown}>
          {filtering.name}
          <Image
            src={"/images/repository/down.svg"}
            alt=""
            width={16}
            height={16}
            className={st.img}
          />
        </div>
        <div className={st.dropdown}>
          {isOpen && (
            <div className={st.options}>
              {options.map((option) => (
                <div
                  key={option.id}
                  className={`${st.option} ${
                    option.value === filtering.value ? st.active : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr />
      {showModal && (
        <MoveFolder
          closeModal={closeModal}
          folderId={folderId}
          setMoveFolderId={setMoveFolderId}
          moveRepository={moveRepository}
        />
      )}
      <div className={st.repository}>
        <Repository
          moveRepositoryMode={moveRepositoryMode}
          repositoryList={innerFolder.repositories}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
}
