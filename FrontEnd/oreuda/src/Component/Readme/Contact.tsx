"use client";

import { useState } from "react";
import st from "./Baekjoon.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectReadme,
  setBlogLink,
  setMailDomain,
  setMailId,
} from "@/store/modules/readme";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";

export const emailChoiceData: any = ["naver.com", "nate.com", "daum.com"];
export default function Contact() {
  const mailId: string = useAppSelector(selectReadme).mailId;
  const blogLink: string = useAppSelector(selectReadme).blogLink;
  const dispatch = useAppDispatch();
  const [id, setId] = useState(mailId);
  const [blog, setBlog] = useState(blogLink);
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      // global state에 저장해야 함
      dispatch(setMailId(id));
      dispatch(setBlogLink(blog));
    }
  };
  const onChangeEmailOption = (e: any) => {
    dispatch(setMailDomain(e.target.value));
  };
  return (
    <div className={st.ContactMain}>
      <div className={st.titleDiv}>
        <span>연락처(Contacts)</span>
        <p>연락 가능한 정보 및 기술 블로그를 넣어보세요.</p>
      </div>
      <div className={st.ContentDiv}>
        <div className={st.mailDiv}>
          <p>메일 링크</p>
          <input
            className={st.mailInput}
            type="text"
            placeholder="이메일 아이디"
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
            value={id}
          ></input>
          <select className={st.selectSV} onChange={onChangeEmailOption}>
            {emailChoiceData.map((data: string, index: number) => {
              return (
                <option value={data} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <div className={st.mailDiv}>
          <p>기술 블로그 링크</p>
          <input
            className={st.blogInput}
            type="text"
            placeholder="블로그 링크"
            onChange={(e) => setBlog(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
            value={blog}
          ></input>
        </div>
      </div>
      <div>
        <PrevBtn />
        <NextBtn />
      </div>
    </div>
  );
}
