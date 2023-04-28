"use client";
/* eslint-disable @next/next/no-img-element */
import st from "./Preview.module.scss";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Image from "next/image";

export default function Preview() {
  const BaekJoonData = useAppSelector(selectReadme).baekjoonId;
  const SolvedThemeData = useAppSelector(selectReadme).solvedTheme;

  const firstImgUrl = `http://mazassumnida.wtf/api/v2/generate_badge?boj=${BaekJoonData}`;
  const secImgUrl = `http://mazandi.herokuapp.com/api?handle=${BaekJoonData}&theme=${SolvedThemeData}`;

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
            src={`/images/readme/copy.svg`}
            width="30"
            height="30"
            alt="download"
          />
        </div>
        <div className={st.downloadBtn} onClick={onClickDownload}>
          <Image
            src={`/images/readme/download.svg`}
            width="30"
            height="30"
            alt="download"
          />
        </div>
        <button className={st.btnDiv}>초기화</button>
      </div>
      <div className={st.contentDiv}>
        {/* <Link href="http://solved.ac/kyum8562"> */}
        <img src={firstImgUrl} width="280" height="140" alt="baekjoon" />
        <img src={secImgUrl} width="285" height="140" alt="baekjoon" />
        {/* </Link> */}
      </div>
    </div>
  );
}
