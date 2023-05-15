"use client";
import { CreateReadme } from "@/Api/Readme/createReadme";
/* eslint-disable @next/next/no-img-element */
import st from "./Preview.module.scss";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";

export default function Preview() {
  const BaekJoonData = useAppSelector(selectReadme).baekjoonId;
  const SolvedThemeData = useAppSelector(selectReadme).solvedTheme;

  const githubId = useAppSelector(selectReadme).githubId;
  const githubTheme = useAppSelector(selectReadme).githubTheme;

  const mulType = useAppSelector(selectReadme).mulType;
  const mulTheme = useAppSelector(selectReadme).mulTheme;

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

  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

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
        <div key={Math.random() * (1000000 - 1)} className={st.TextArr}>
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
        <div key={Math.random() * (1000000 - 1)} className={st.TextArr}>
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
      arr.push(<h3 key={Math.random() * (1000000 - 1)}>{el.name}</h3>);
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

  const parseTextEnter = (text: string) => {
    const arr: any = [];
    const textSplit = text.split("<br />");
    textSplit.map((el: any, index: number) => {
      arr.push(<span className={st.textareaParse}>{el}</span>);
      if (textSplit.length - 1 > index) arr.push(<br />);
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
      <h3>Tech Stack</h3>
      {/* <h3>{techTitle}</h3> */}
      <div className={st.TextArr}>{showTechWhole()}</div>
      <h3>{techTitle}</h3>
      <div className={st.techBadgeDiv}>{showTechArr()}</div>
    </div>,
    <div key="5" className={st.TextArr}>
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
    <div key="6">
      <img
        src={`https://oreuda.kr/api/v1/plant/card?nickname=${githubId}`}
        alt="oreuda"
      />
    </div>,
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
      arr.push(
        `<h3 key=${index} style ="font-size : 1.5em; font-weight:700;">${el.name}</h3>`
      );
      const arr2: any = [];

      el.techArray.map((elel: any, idx: any) => {
        const x = `https://img.shields.io/badge/${elel.name}-${elel.color}?style=flat&logo=${elel.name}&logoColor=white`;
        arr2.push(
          `<img
          key=${Math.random() * (1000000 - 1)}
          style = "margin: 5px 5px;"
          src=${x}
          alt=""
        />`
        );
      });
      arr.push(`<div ">${arr2.join(" ")}</div>`);
    });
    return arr.join("");
  };

  const AdditionalTextMD = (id: number) => {
    return `
  <div key="7" >
    <div key=${id - 1} >
          <h3 style ="font-size : 1.5em; font-weight:700;">${
            textArr[id - 1].titleArr
          }</h3>
          <p style ="font-size : 20px;">${textArr[id - 1].descArr}</p>
    </div>
  </div>
  `;
  };

  // md parsing을 위하여 변수가 포함된 src를 사용하기 위하여 빼놓은 문자열입니다.
  const blogImg = `https://img.shields.io/badge/TechBlog-7FD2F5?style=flat&logo=Hoppscotch&logoColor=white&link=${blogLink}/`;
  const notionImg = `https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white&link=${notionLink}/`;
  const oreuCard = `https://oreuda.kr/api/v1/plant/card?nickname=${githubId}`;

  // 각각의 컴포넌트 (tmp)를 md 문자열로 변환한 String 배열입니다.
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
  <div key="4">
  <h3 style ="font-size : 2em; font-weight:700;">Tech Stack</h3>
    <div >${showTechWholeMD()}</div>
  </div>
  `,
    `
  <div key="5">
    <h3 style ="font-size : 2em; font-weight:700;">Contact</h3>
    <div className=${st.contactBadgeDiv}>
      ${
        mailId.length > 0
          ? `<a href=${mailURL} target="_blank">
            <img
              src="https://img.shields.io/badge/Mail-6667AB?style=flat&logo=Gmail&logoColor=white"
              alt="Mail"
            />
          </a>`
          : ""
      }
      ${
        blogLink.length > 0
          ? `<a href=${blogLink} target="_blank">
            <img src=${blogImg} alt="blog" />
          </a>`
          : ""
      }
      ${
        notionLink.length > 0
          ? `<a href=${notionLink} target="_blank">
            <img src=${notionImg} alt="notion" />
          </a>`
          : ""
      }
    </div>
  </div>
  `,
    `
  <div key="6">
    <a href = "https://oreuda.kr/">
      <img
        src=${oreuCard}
        alt="oreuda"
      />
    </a>
  </div>
  `,
  ];

  // caution : MD 파일 상단에 작성할 안내 메세지입니다.
  const caution = `\n<!-- font-size 를 조절하면 원하는 크기로 글자를 조절할 수 있습니다.-->
  <!-- Designed and developed in-house at Oreuda (https://oreuda.kr) -->
  <!-- 불편 사항 및 문의는 tykimdream@gmail.com으로 보내주세요 -->`;

  // toMD : 작성된 HTML을 md로 변환한 문자열을 저장합니다.
  let toMD = `<div  style = "display: flex;  align-items: center; flex-direction: column;  justify-content: center;">`;
  toMD += caution;

  // nPrevComp : toMD에 작성한 컴포넌트들을 붙히는 함수입니다.
  nPrevComp.map((key: any) => {
    if (key > 10) {
      // text arr 인 경우
      toMD += AdditionalTextMD(key % 10);
    } else {
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
          <div key={Math.random() * (1000000 - 1)} className={st.TextArr}>
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
    // console.log(nPrevComp);
    // console.log(toMD);
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
      navigator.clipboard.writeText(toMD);
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  // 저장 버튼 클릭시 readme 저장 axios 요청
  const saveReadme = async () => {
    if (window.confirm("저장하시겠습니까!?")) {
      const arr: any = [];
      nPrevComp.map((el: any, idx: any) => {
        let curr = Number(el);
        let pushData = {};
        if (curr === 1) {
          pushData = {
            readmeType: "BOJ",
            bojValue: BaekJoonData.length > 0 ? BaekJoonData : "temp",
            bojTheme: SolvedThemeData,
          };
        } else if (curr === 2) {
          pushData = { readmeType: "GIT", gitTheme: githubTheme };
        } else if (curr === 3) {
          pushData = {
            readmeType: "LANGUAGE",
            languageTheme: mulTheme,
            languageType: mulType,
          };
        } else if (curr === 4) {
          techPlusWhole.map((el: any, index: any) => {
            // 제목 백에서 넣어줄 예정
            pushData = {
              readmeType: "TECH",
              techTitle: el.name,
              techStack: el.techArray,
            };
            // pushData = { readmeType: "TECH", techStack: el.techArray };
            arr.push(pushData);
          });
        } else if (curr === 5) {
          pushData = {
            readmeType: "CONTACT",
            mailLink: `${mailId}@${mailDomain}`,
            blogLink: blogLink.length > 0 ? blogLink : "temp",
            notionLink: notionLink.length > 0 ? notionLink : "temp",
          };
        } else if (curr === 6) {
          pushData = { readmeType: "PLANT" };
        } else if (curr > 10) {
          const tmp = (curr % 10) - 1;

          pushData = {
            readmeType: "WRITING",
            writingTitle: textArr[tmp].titleArr,
            writingContents: textArr[tmp].descArr,
          };
        }

        // pushData = {readmeType:"WRITING", writingTitle}
        if (curr !== 4) arr.push(pushData);
      });
      try {
        // console.log(`pushArr: `, arr);
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/readme`,
          arr,
          {
            headers: {
              Authorization: ACCESS_TOKEN,
            },
          }
        );
        // console.log(res);
      } catch (err: any) {
        console.log(err);
      }
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
        <button className={st.btnReset}>초기화</button>
        <button
          className={`${st.btnSave} ${
            currComponent === 8 ? undefined : st.disabledBtn
          }`}
          onClick={saveReadme}
          disabled={currComponent !== 8}
        >
          저장
        </button>
      </div>
      <div className={st.contentDiv}>
        {Number(currComponent) == 8
          ? renderingSorting()
          : renderingPrevSorting()}
      </div>
    </div>
  );
}
