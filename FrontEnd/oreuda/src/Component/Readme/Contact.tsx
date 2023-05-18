"use client";

import { useState } from "react";
import st from "./Contact.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectReadme,
  setBlogLink,
  setMailDomain,
  setMailId,
  setNotionLink,
} from "@/store/modules/readme";

export const emailChoiceData: any = ["naver.com", "nate.com", "gmail.com"];
export default function Contact() {
  const mailId: string = useAppSelector(selectReadme).mailId;
  const mailDomain: string = useAppSelector(selectReadme).mailDomain;
  const blogLink: string = useAppSelector(selectReadme).blogLink;
  const notionLink = useAppSelector(selectReadme).notionLink;
  const dispatch = useAppDispatch();
  const [id, setId] = useState(mailId);
  const [blog, setBlog] = useState(blogLink);
  const [notion, setNotion] = useState(notionLink);
  const [openModal, setOpenModal] = useState(false);
  const [optionVal, setOptionVal] = useState("선택해주세요");
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setMailId(id));
      dispatch(setBlogLink(blog));
      dispatch(setNotionLink(notion));
    }
  };
  const onChangeEmailOption = (data: any) => {
    dispatch(setMailDomain(data));
  };
  return (
    <div className={st.ContactMain}>
      <div className={st.titleDiv}>
        <span>연락처(Contacts)</span>
        <p>
          연락 가능한 정보 및 기술 블로그를 넣어보세요📞
          <br /> 입력한 URL은 해당 뱃지의 링크로 담겨집니다!
        </p>
      </div>
      <div className={st.ContentDiv}>
        <div className={st.mailDiv}>
          <p>메일 링크</p>
          <div className={st.mailDivDiv}>
            <input
              className={st.mailInput}
              type="text"
              placeholder="이메일 아이디"
              onChange={(e) => {
                setId(e.target.value);
                dispatch(setMailId(e.target.value));
              }}
              onKeyDown={(e) => activeEnter(e)}
              value={id}
            ></input>
            {/* <select className={st.selectSV} onChange={onChangeEmailOption}>
            {emailChoiceData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select> */}

            <div className={`${st.dropdown} ${openModal ? st.option : ""}`}>
              <input
                type="text"
                className={openModal ? st.focusInput : ""}
                placeholder="선택해주세요"
                readOnly
                value={mailDomain}
                onClick={(e) => {
                  setOpenModal(!openModal);
                }}
              />
              <div className={` ${openModal ? st.option : st.display}`}>
                {emailChoiceData.map((data: string, index: number) => {
                  return (
                    <div
                      key={Math.random() * (1000000 - 1)}
                      onClick={(e) => {
                        setOptionVal(data);
                        setOpenModal(!openModal);
                        onChangeEmailOption(data);
                      }}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={st.mailDiv}>
          <p>기술 블로그 링크</p>
          <input
            className={st.blogInput}
            type="text"
            placeholder="블로그 링크"
            onChange={(e) => {
              setBlog(e.target.value);
              dispatch(setBlogLink(e.target.value));
            }}
            onKeyDown={(e) => activeEnter(e)}
            value={blog}
          ></input>
        </div>
        <div className={st.mailDiv}>
          <p>노션 링크</p>
          <input
            className={st.blogInput}
            type="text"
            placeholder="노션 링크"
            onChange={(e) => {
              setNotion(e.target.value);
              dispatch(setNotionLink(e.target.value));
            }}
            onKeyDown={(e) => activeEnter(e)}
            value={notion}
          ></input>
        </div>
      </div>
    </div>
  );
}
