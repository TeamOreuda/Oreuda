"use client";

import st from "./Preview.module.scss";
import { useAppSelector } from "@/store/hooks";
import { selectReadme } from "@/store/modules/readme";
import Image from "next/image";
import Link from "next/link";

export default function Preview() {
  const BaekJoonData = useAppSelector(selectReadme);
  console.log(BaekJoonData);
  return (
    <div className={st.body}>
      <div className={st.headerDiv}>
        <div className={st.Colbar}></div>
        <div className={st.headerText}>
          <span className={st.MainText}>프리뷰</span>
          <p className={st.SubText}>리드미 결과 화면을 확인해 보세요.</p>
        </div>
        <button className={st.btnDiv}>초기화</button>
      </div>
      <div className={st.contentDiv}>
        <Link href="http://solved.ac/kyum8562">
          <Image
            src="http://mazassumnida.wtf/api/v2/generate_badge?boj=kyum8562"
            width="100"
            height="50"
            alt="baekjoon"
          />
          <Image
            src="http://mazandi.herokuapp.com/api?handle=kyum8562&theme=dark"
            width="100"
            height="50"
            alt="baekjoon"
          />
        </Link>
      </div>
    </div>
  );
}
