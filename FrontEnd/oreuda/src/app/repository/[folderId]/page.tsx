"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";

import st from "./page.module.scss";
import Repository from "@/Component/Repository/repository";

import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import MoveFolder from "@/Component/Repository/moveFolder";
export default function RepositoryPage() {
  const params = useParams();
  const folderId = Number(params.folderId);
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [showModal, setShowModal] = useState(false);
  const [moveRepository, setmoveRepository] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [repositoryListData, setRepositoryListData] = useState([]);

  const options = [
    { id: 1, value: "recent", name: "최신순" },
    { id: 2, value: "commit", name: "커밋순" },
    { id: 3, value: "name", name: "이름순" },
    { id: 4, value: "star", name: "별점순" },
  ];
  const [filtering, setFiltering] = useState(options[0]);

  // const [isOpen, setIsOpen] = useState(true);
  // const [selectedOption, setSelectedOption] = useState(options[0]);

  // const handleOptionClick = (option: any) => {
  //   setSelectedOption(option);
  //   setIsOpen(!isOpen);
  // };
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const clickMove = () => {
  //   setmoveRepository(!moveRepository);
  // };

  useEffect(() => {
    const loadRepositoryList = async () => {
      try {
        const res = await GetRepositoryLst(ACCESS_TOKEN, folderId, "recent");
        setRepositoryListData(res.data);
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookiesAndRedirect(
            token.data.Authorization,
            token.data.RefreshToken
          );
          const res = await GetRepositoryLst(ACCESS_TOKEN, folderId, "recent");
          setRepositoryListData(res.data);
        }
      }
    };
    loadRepositoryList();
  }, [ACCESS_TOKEN, REFRESH_TOKEN, folderId]);

  const clickModal = () => {
    alert("준비중입니다");
    // if (repositoryListData?.length == 0) {
    //   alert("선택하신 레포지토리가 없습니다");
    // } else {
    //   setShowModal(!showModal);
    // }
  };

  return (
    <div className={st.body}>
      <div className={st.button}>
        <button onClick={clickModal}>
          {false ? "확 인" : "레포지토리 이동"}
          <Image
            className={st.img}
            src="/images/repository/send.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
      </div>
      {/* <div onClick={(e) => e.stopPropagation()}>
        <div className={st.dropdown} onClick={toggleDropdown}>
          {selectedOption.name}
        </div>
        <div className={st.dropdown}>
          {isOpen && (
            <div className={st.options}>
              {options.map((option) => (
                <div
                  key={option.id}
                  className={`${st.option} ${
                    option.value === selectedOption.value ? st.active : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
      <hr />
      {/* {showModal && (
        <MoveFolder clickModal={clickModal} folderId={folderId} filtering={filtering} />
      )} */}
      <div className={st.repository}>
        <Repository
          clickMove={false}
          repositoryList={repositoryListData}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
}
