import Image from "next/image";

import pg from "../Landing.module.scss";
import st from "./Main7.module.scss";
export default function Main7() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        <div className={st.layoutLeft}>
          <Image
            className={st.greenEllipse}
            data-position={1}
            data-name={1}
            src={`/images/landing/main7/GreenEllipse.svg`}
            alt="유지연"
            width={1037}
            height={1380}
            draggable={false}
            priority
          />
          <div className={st.title}>
            <span className={st.highlight}>팀원</span> &nbsp;소개
          </div>
          <div className={st.intro}>
            오르다 서비스를 만든 팀원을 소개합니다. <br /> 열심히 서비스를
            준비했습니다. <br /> 많은 관심 부탁드릴게요:)
          </div>
        </div>
        <div className={st.layoutRight}>
          <div className={st.cardRow}>
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/JY.svg`}
              alt="유지연"
              width={470}
              height={235}
              draggable={false}
              priority
            />
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/CK.svg`}
              alt="김창겸"
              width={470}
              height={235}
              draggable={false}
              priority
            />
          </div>
          <div className={st.cardRow}>
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/SY.svg`}
              alt="김소윤"
              width={470}
              height={235}
              draggable={false}
              priority
            />
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/JH.svg`}
              alt="김지환"
              width={470}
              height={235}
              draggable={false}
              priority
            />
          </div>
          <div className={st.cardRow}>
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/SU.svg`}
              alt="길상욱"
              width={470}
              height={235}
              draggable={false}
              priority
            />
            <Image
              className={st.card}
              data-position={1}
              data-name={1}
              src={`/images/landing/main7/EJ.svg`}
              alt="송은지"
              width={470}
              height={235}
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
