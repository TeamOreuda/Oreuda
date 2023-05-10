"use client";
/* eslint-disable @next/next/no-img-element */
import st from "./Preview.module.scss";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Image from "next/image";
import { useEffect } from "react";

export default function Preview() {
  const BaekJoonData = useAppSelector(selectReadme).baekjoonId;
  const mulTheme = useAppSelector(selectReadme).mulTheme;

  const SolvedThemeData = useAppSelector(selectReadme).solvedTheme;
  const githubId = useAppSelector(selectReadme).githubId;
  const githubTheme = useAppSelector(selectReadme).githubTheme;
  const mulType = useAppSelector(selectReadme).mulType;
  const newTextTitle = useAppSelector(selectReadme).newTextTitle;
  const newTextDesc = useAppSelector(selectReadme).newTextDesc;
  const textArr = useAppSelector(selectReadme).textArr;
  const techTitle = useAppSelector(selectReadme).techTitle;
  const techPlusArr = useAppSelector(selectReadme).techPlusArr;
  const techPlusWhole = useAppSelector(selectReadme).techPlusWhole;
  const componentArr = useAppSelector(selectReadme).componentArr;
  const mailId = useAppSelector(selectReadme).mailId;
  const mailDomain = useAppSelector(selectReadme).mailDomain;
  const blogLink = useAppSelector(selectReadme).blogLink;
  const notionLink = useAppSelector(selectReadme).notionLink;
  console.log(componentArr);

  // 연락처
  // const mailURL = `https://mail.${mailDomain}/mail/?view=cm&amp;fs=1&amp;to=${mailId}@${mailDomain}/`;
  const mailURL = `mailto:${mailId}@${mailDomain}`;

  // 백준
  const firstImgUrl = `http://mazassumnida.wtf/api/v2/generate_badge?boj=${BaekJoonData}`;
  const secImgUrl = `http://mazandi.herokuapp.com/api?handle=${BaekJoonData}&theme=${SolvedThemeData}`;

  // 깃헙
  // const githubUrl = `https://github-readme-stats.vercel.app/api?username=${githubId}&show_icons=true&theme=${githubTheme}`;
  const githubUrl = `https://github-readme-stats.vercel.app/api?username=kyum8562&show_icons=true&theme=${githubTheme}`;

  // MUL
  // (1) 디폴트
  let mulUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=kyum8562`;
  // (2) 간략히
  if (mulType == 2) mulUrl += `&layout=compact`;
  // (3) 수치 제거
  else if (mulType == 3) mulUrl += `&hide_progress=true`;
  // 테마 추가
  mulUrl += `&theme=${mulTheme}`;

  // 추가 텍스트

  // README.md 파일 다운로드
  const file = {
    title: "README",
    content: "content",
  };

  const onClickDownload = () => {
    const blob = new Blob([file.content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.title}.md`;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  // 클립보드 복사
  const onClickCopy = () => {
    try {
      navigator.clipboard.writeText("hi");
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  const showTextArr = () => {
    const arr = [];
    for (let i = 0; i < textArr.length; i++) {
      arr.push(
        <div key={i}>
          <h3>{textArr[i].titleArr}</h3>
          <p>{textArr[i].descArr}</p>
        </div>
      );
    }

    return arr;
  };
  const showTechArr = () => {
    const arr = [];
    for (let i = 0; i < techPlusArr.length; i++) {
      arr.push(
        <img
          key={i}
          className={st.techBadge}
          src={`https://img.shields.io/badge/${techPlusArr[i].name}-${techPlusArr[i].color}?style=flat&logo=${techPlusArr[i].name}&logoColor=white`}
          alt=""
        />
      );
    }

    return arr;
  };
  const showTechWhole = () => {
    const arr: any = [];

    techPlusWhole.map((el, index) => {
      arr.push(<h3 key={index}>{el.name}</h3>);

      el.techArray.map((elel: any, idx: any) => {
        arr.push(
          <img
            key={elel.index}
            className={st.techBadge}
            src={`https://img.shields.io/badge/${elel.name}-${elel.color}?style=flat&logo=${elel.name}&logoColor=white`}
            alt=""
          />
        );
      });
    });
    return arr;
    // for (let i = 0; i < techPlusWhole.length; i++) {
    //   const len = techPlusWhole[i].techArray.length;
    //   console.log(len);

    //   for (let j = 0; j < len; j++) {
    //     arr.push(
    //       <img
    //         // key={j}
    //         className={st.techBadge}
    //         src={`https://img.shields.io/badge/${techPlusWhole[i].techArray.name}-${techPlusWhole[i].techArray.color}?style=flat&logo=${techPlusWhole[i].techArray.name}&logoColor=white`}
    //         alt=""
    //       />
    //     );
    //   }

    //   return arr;
    // }
  };

  return (
    <div className={st.body}>
      <div className={st.headerDiv}>
        <div className={st.Colbar}></div>
        <div className={st.headerText}>
          <span className={st.MainText}>프리뷰</span>
          <p className={st.SubText}>리드미 결과 화면을 확인해 보세요.</p>
        </div>
        <div className={st.CopyBtn} onClick={onClickCopy}>
          <Image
            src="/images/readme/copy.svg"
            width="30"
            height="30"
            alt="download"
          />
        </div>
        <div className={st.downloadBtn} onClick={onClickDownload}>
          <Image
            src="/images/readme/download.svg"
            width="30"
            height="30"
            alt="download"
          />
        </div>
        <button className={st.btnDiv}>초기화</button>
      </div>
      <div className={st.contentDiv}>
        {/* <Link href="http://solved.ac/kyum8562"> */}
        {componentArr[1] ? (
          <>
            <img src={firstImgUrl} width="280" height="140" alt="baekjoon" />
            <img src={secImgUrl} width="285" height="140" alt="solved" />
          </>
        ) : undefined}
        {componentArr[2] ? (
          <img src={githubUrl} width="350" height="150" alt="githubStats" />
        ) : undefined}
        {componentArr[3] ? (
          <img src={mulUrl} width="280" height="270" alt="MUL" />
        ) : undefined}
        {componentArr[4] ? (
          <>
            {showTechWhole()}
            <h3>{techTitle}</h3>
            <div className={st.techBadgeDiv}>{showTechArr()}</div>
          </>
        ) : undefined}
        {componentArr[5] ? (
          <>
            <h3>Contact</h3>
            <div className={st.contactBadgeDiv}>
              {mailId.length > 0 ? (
                <a href={mailURL} target="_blank">
                  <img
                    src="https://img.shields.io/badge/Mail-6667AB?style=flat&logo=Gmail&logoColor=white"
                    alt="Mail"
                  />
                </a>
              ) : undefined}
              {blogLink.length > 0 ? (
                <a href={blogLink} target="_blank">
                  <img
                    src={`https://img.shields.io/badge/Tech Blog-7FD2F5?style=flat&logo=Hoppscotch&logoColor=white&link=${blogLink}/`}
                    alt="blog"
                  />
                </a>
              ) : undefined}
              {notionLink.length > 0 ? (
                <a href={notionLink} target="_blank">
                  <img
                    src={`https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white&link=${notionLink}/`}
                    alt="notion"
                  />
                </a>
              ) : undefined}
            </div>
          </>
        ) : undefined}
        {componentArr[7] ? (
          <>
            {showTextArr()}
            <h3>{newTextTitle}</h3>
            <p>{newTextDesc}</p>
          </>
        ) : undefined}
      </div>
    </div>
  );
}
