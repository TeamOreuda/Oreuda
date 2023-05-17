"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import st from "./page.module.scss";
import MoveFolder from "@/Component/Repository/moveFolder";
import Repository from "@/Component/Repository/repository";

import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { MoveRepository } from "@/Api/Repository/moveRepository";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import { saveCookies } from "@/Api/Oauth/saveCookies";

export default function RepositoryPage() {
  const params = useParams();
  const folderId = Number(params.folderId);
  const searchParams = new URLSearchParams(window.location.search);
  const folderName = searchParams.get("folderName");
  const folderColor = searchParams.get("folderColor");
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [showModal, setShowModal] = useState(false);
  const [moveRepositoryMode, setMoveRepositoryMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [moveFolderId, setMoveFolderId] = useState<number>(-1);
  const [repositoryList, setRepositoryList] = useState([]);

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
      setRepositoryList(res.data);
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
          setRepositoryList(res.data);
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

  return (
    <div className={st.body}>
      <div className={st.folderName}>
        <Image
          src={`/images/folder/${folderColor}.svg`}
          alt=""
          width={36}
          height={36}
        />
        <span>{folderName}</span>
        <Image
          className={st.editImg}
          src={`/images/repository/editing.svg`}
          alt=""
          width={24}
          height={24}
        />
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
          repositoryList={repositoryList}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
}
