import Image from "next/image";

import pg from "../Landing.module.scss";
import st from "./Main5.module.scss";

export default function Main4() {
  return (
    <div className={`${pg.page} ${st.layout}`}>
      {/* content 영역 */}
      <div className={st.content}>
        <div className={st.title}>
          오르와 함께&nbsp;<span className={st.highlight}>성장</span>하세요!
        </div>
        <div className={st.intro}>
          <div>사용자의 깃헙 활동을 분석하여 오르가 성장합니다.</div>
          <div>
            단, 활동을 안하면 오르가 다시
            <Image
              className={st.crySoil}
              data-position={1}
              data-name={1}
              src={`/images/character/CrySoil.svg`}
              alt="스택"
              width={48}
              height={50}
              draggable={false}
              priority
            />
            으로 돌아갈 수 있으니 주의해주세요!
          </div>
        </div>

        <div className={st.plant}>
          <Image
            className={st.soil}
            data-position={1}
            data-name={1}
            src={`/images/character/Soil.svg`}
            alt="스택"
            width={220}
            height={200}
            draggable={false}
            priority
          />

          <Image
            className={st.arrow}
            data-position={1}
            data-name={1}
            src={`/images/landing/main5/arrow.svg`}
            alt="스택"
            width={50}
            height={86}
            draggable={false}
            priority
          />

          <Image
            className={st.earth}
            data-position={1}
            data-name={1}
            src={`/images/character/Earth.svg`}
            alt="스택"
            width={320}
            height={320}
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* img 영역 */}
      <div className={st.imgs}>
        <Image
          data-position={1}
          data-name={1}
          src={`/images/landing/main5/GreenEllipse.svg`}
          className={st.ellipse}
          alt="타원"
          width={1400}
          height={1600}
          draggable={false}
        />
        <Image
          data-position={1}
          data-name={1}
          src={`/images/landing/main5/GreenState.gif`}
          className={st.state}
          alt="chart gif"
          width={480}
          height={380}
          draggable={false}
        />
      </div>
    </div>
  );
}
