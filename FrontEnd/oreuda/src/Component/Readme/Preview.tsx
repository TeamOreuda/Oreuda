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
  const currComponent = useAppSelector(selectReadme).currComponent;
  const prevComp = useAppSelector(selectReadme).prevComp;
  const nextComp = useAppSelector(selectReadme).nextComp;
  const nPrevComp = useAppSelector(selectReadme).nPrevComp;
  const techArr = useAppSelector(selectReadme).techArr;

  // 연락처
  // const mailURL = `https://mail.${mailDomain}/mail/?view=cm&amp;fs=1&amp;to=${mailId}@${mailDomain}/`;
  const mailURL = `mailto:${mailId}@${mailDomain}`;

  // 백준
  const firstImgUrl = `http://mazassumnida.wtf/api/v2/generate_badge?boj=${BaekJoonData}`;
  const secImgUrl = `http://mazandi.herokuapp.com/api?handle=${BaekJoonData}&theme=${SolvedThemeData}`;

  // 깃헙
  // const githubUrl = `https://github-readme-stats.vercel.app/api?username=${githubId}&show_icons=true&theme=${githubTheme}`;
  const githubUrl = `https://github-readme-stats.vercel.app/api?username=${githubId}&show_icons=true&theme=${githubTheme}`;

  // MUL
  // (1) 디폴트
  let mulUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubId}`;
  let mulHeight = 270;
  // (2) 간략히
  if (mulType == 2) {
    mulUrl += `&layout=compact`;
    mulHeight = 180;
  }
  // (3) 수치 제거
  else if (mulType == 3) {
    mulUrl += `&hide_progress=true`;
    mulHeight = 156;
  } else {
    mulHeight = 270;
  }
  // 테마 추가
  mulUrl += `&theme=${mulTheme}`;

  // 추가 텍스트

  // Text 배열 한번에 뿌려주는 메서드
  const showTextArr = () => {
    const arr = [];
    for (let i = 0; i < textArr.length; i++) {
      arr.push(
        <div key={i} className={st.TextArr}>
          <h3>{textArr[i].titleArr}</h3>
          <p>{textArr[i].descArr}</p>
        </div>
      );
    }
    return arr;
  };

  // 작성중인(추가하지 않은) 테크 컴포넌트 렌더링
  const showTechArr = () => {
    const arr = [];
    for (let i = 0; i < techPlusArr.length; i++) {
      arr.push(
        <div key={i} className={st.TextArr}>
          <img
            key={Math.random() * (1000000 - 1)}
            className={st.techBadge}
            src={`https://img.shields.io/badge/${techPlusArr[i].name}-${techPlusArr[i].color}?style=flat&logo=${techPlusArr[i].name}&logoColor=white`}
            alt=""
          />
        </div>
      );
    }

    return arr;
  };

  // 완성된 테크 컴포넌트 렌더링
  const showTechWhole = () => {
    const arr: any = [];

    techPlusWhole.map((el, index) => {
      arr.push(<h3 key={index}>{el.name}</h3>);
      const arr2: any = [];

      el.techArray.map((elel: any, idx: any) => {
        arr2.push(
          <img
            key={Math.random() * (1000000 - 1)}
            className={st.techBadge}
            src={`https://img.shields.io/badge/${elel.name}-${elel.color}?style=flat&logo=${elel.name}&logoColor=white`}
            alt=""
          />
        );
      });
      arr.push(<div className={st.techBadgeDiv}>{arr2}</div>);
    });
    return arr;
  };

  // 컴포넌트 별 jsx (1 ~ 7)
  const tmp = [
    "",
    <div key="1">
      <img src={firstImgUrl} width="280" height="140" alt="baekjoon" />
      <img src={secImgUrl} width="285" height="140" alt="solved" />
    </div>,
    <div key="2">
      <img src={githubUrl} width="350" height="150" alt="githubStats" />
    </div>,
    <div key="3">
      <img src={mulUrl} width="280" height={mulHeight} alt="MUL" />
    </div>,
    <div key="4" className={st.TextArr}>
      <div className={st.TextArr}>{showTechWhole()}</div>
      <h3>{techTitle}</h3>
      <div className={st.techBadgeDiv}>{showTechArr()}</div>
    </div>,
    <div key="5">
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
    </div>,
    "오르",
    <div key="7" className={st.TextArr}>
      {showTextArr()}
      <h3>{newTextTitle}</h3>
      <p>{newTextDesc}</p>
    </div>,
  ];

  // MD 관련 Function을 정의합니다.
  // ******************************************************************************** /
  const showTechWholeMD = () => {
    const arr: any = [];

    techPlusWhole.map((el, index) => {
      arr.push(`<h3 key=${index}>${el.name}</h3>`);
      const arr2: any = [];

      el.techArray.map((elel: any, idx: any) => {
        const x = `https://img.shields.io/badge/${elel.name}-${elel.color}?style=flat&logo=${elel.name}&logoColor=white`;
        arr2.push(
          `<img
          key=${Math.random() * (1000000 - 1)}
          className=${st.techBadge}
          src=${x}
          alt=""
        />`
        );
      });
      arr.push(`<div className=${st.techBadgeDiv}>${arr2.join(" ")}</div>`);
    });
    return arr.join("");
  };

  const showTechArrMD = () => {
    const arr = [];
    for (let i = 0; i < techPlusArr.length; i++) {
      const x = `https://img.shields.io/badge/${techPlusArr[i].name}-${techPlusArr[i].color}?style=flat&logo=${techPlusArr[i].name}&logoColor=white`;
      arr.push(
        `        <div key=${i} className=${st.TextArr}>
          <img
            key=${Math.random() * (1000000 - 1)}
            className=${st.techBadge}
            src=${x}
            alt=""
          />
        </div>`
      );
    }

    return arr.join("");
  };

  const showTextArrMD = () => {
    console.log(textArr)
    const arr = [];
    for (let i = 0; i < textArr.length; i++) {
      arr.push(
        `<div key=${i} className=${st.TextArr}>
          <h3>${textArr[i].titleArr} 12</h3>
          <p>${textArr[i].descArr} 12</p>
        </div>`
      );
    }
    return arr.join("");
  };

const AdditionalTextMD =(id : number)=>{
  return `
  <div key="7" className=${st.TextArr}>
    <div key=${id-1} className=${st.TextArr}>
          <h3>${textArr[id-1].titleArr}</h3>
          <p>${textArr[id-1].descArr}</p>
    </div>
  </div>
  `
}

  const x = `https://img.shields.io/badge/TechBlog-7FD2F5?style=flat&logo=Hoppscotch&logoColor=white&link=${blogLink}/`;
  const y = `https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white&link=${notionLink}/`;

  const selected: String[] = [
    `
  <div key="1">
    <img src=${firstImgUrl} width="280" height="140" alt="baekjoon" />
    <img src=${secImgUrl} width="285" height="140" alt="solved" />
  </div>
  `,
    `
  <div key="2">
    <img src=${githubUrl} width="350" height="150" alt="githubStats" />
  </div>
  `,
    `
  <div key="3">
    <img src=${mulUrl} width="280" height=${mulHeight} alt="MUL" />
  </div>
  `,
    `
  <div key="4" className=${st.TextArr}>
    <div className=${st.TextArr}>${showTechWholeMD()}</div>
    <h3>${techTitle}</h3>
    <div className=${st.techBadgeDiv}>${showTechArrMD()}</div>
  </div>
  `,
    `
  <div key="5">
    <h3>Contact</h3>
    <div className=${st.contactBadgeDiv}>
      ${
        mailId.length > 0 ? (
          `<a href=${mailURL} target="_blank">
            <img
              src="https://img.shields.io/badge/Mail-6667AB?style=flat&logo=Gmail&logoColor=white"
              alt="Mail"
            />
          </a>`
        ) : (
          ""
        )
      }
      ${
        blogLink.length > 0 ? (
          `<a href=${blogLink} target="_blank">
            <img src=${x} alt="blog" />
          </a>`
        ) : (
          ""
        )
      }
      ${
        notionLink.length > 0 ? (
          `<a href=${notionLink} target="_blank">
            <img src=${y} alt="notion" />
          </a>`
        ) : (
          ""
        )
      }
    </div>
  </div>
  `,
    `
  오르
  `
  ];

  let toMD = `<div>\n`;
  nPrevComp.map((key: any) => {
    if(key > 10){
      // text arr 인 경우
      toMD += AdditionalTextMD((key)%10);
    }else{
      toMD += selected[key - 1];
    }
  });
  toMD += `\n</div>`;

  // 인덱스에 해당하는 add Text 배열(textArr) 찾아 리턴
  // => add Text 컴포넌트 분리
  const choiceTempArr = (idx: any) => {
    const arr: any = [];
    textArr.map((el: any, index: any) => {
      if (idx - 1 == index) {
        arr.push(
          <div key={index}>
            <h3>{el.titleArr}</h3>
            <p>{el.descArr}</p>
          </div>
        );
      }
    });
    return arr;
  };

  // (Sorting에서) 프리뷰 렌더링 요소 생성
  const renderingSorting = () => {
    const arr: any = [];
    nPrevComp.map((el: any, index: number) => {
      if (Number(el) < 10) {
        arr.push(tmp[el]);
      } else {
        let i = el.substring(1, 2);
        let tmp = choiceTempArr(i);
        arr.push(tmp);
      }
    });
    return arr;
  };

  // (Sorting 이전의) 프리뷰 렌더링 요소 생성
  const renderingPrevSorting = () => {
    const arr: any = [];
    const tmp2 = [...prevComp, currComponent, ...nextComp];

    tmp2.map((el: any, index: number) => {
      if (index !== 0) {
        arr.push(tmp[el]);
      }
    });

    return arr;
  };
  // README.md 파일 다운로드
  const file = {
    title: "README",
    // content: "content",
    content: toMD,
  };

  // 다운로드 메서드
  const onClickDownload = () => {
    console.log(nPrevComp)
    console.log(toMD);
    const blob = new Blob([file.content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.title}.md`;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  // 클립보드 복사 메서드
  const onClickCopy = () => {
    try {
      navigator.clipboard.writeText("hi");
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
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
        {Number(currComponent) == 8
          ? renderingSorting()
          : renderingPrevSorting()}
      </div>
    </div>
  );
}
