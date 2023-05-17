import Image from "next/image";

import pg from "../Landing.module.scss";
import st from "./Main6.module.scss";

export default function Main6() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        <div className={st.layoutLeft}>
          <Image
            className={st.store}
            data-position={1}
            data-name={1}
            src={`/images/landing/main6/StoreIcon.gif`}
            alt="스토어 이미지"
            width={800}
            height={511}
            draggable={false}
            priority
          />
          <Image
            className={st.store}
            data-position={1}
            data-name={1}
            src={`/images/landing/main6/StoreIcon.gif`}
            alt="스토어 이미지"
            width={800}
            height={511}
            draggable={false}
            priority
          />
        </div>
        <div className={st.layoutRight}>
          <div className={st.content}>
            <div className={st.title}><span className = {st.highlight}>확장 프로그램</span>도 준비했답니다.</div>
            <div className={st.intro}>
              크롬 확장 프로그램을 이용하여,
              <br />
              오르다 서비스에 접속하지 않아도 폴더를 한눈에 볼 수 있어요!
            </div>
            <div className={st.icons}>
              <Image
                className={st.store}
                data-position={1}
                data-name={1}
                src={`/images/landing/main6/StoreIcon.svg`}
                alt="스토어 이미지"
                width={120}
                height={102}
                draggable={false}
                priority
              />
              <Image
                className={st.puzzle}
                data-position={1}
                data-name={1}
                src={`/images/landing/main6/Puzzle.svg`}
                alt="퍼즐 아이콘"
                width={94}
                height={94}
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
