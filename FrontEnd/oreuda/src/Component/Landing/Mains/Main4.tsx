import Image from "next/image";

import pg from "../Landing.module.scss";
import st from "./Main4.module.scss";
export default function Main4() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        {/* content */}
        <div className={st.content}>
          <div className={st.title}>
            레포지토리들을 쉽게&nbsp;<span className={st.highlight}>정렬</span>
            해보세요!
          </div>
          <div className={st.intro}>
            최신순, 커밋순, 이름순, 별점순 원하는 정렬 기준으로 레포지토리들을
            확인해 보세요!
            <br></br>
            <br></br>
            레포지토리마다의 잔디를 확인해 보세요. 그래프는 연도별 커밋수를
            나타냅니다.
            <br></br>몇 년도에 가장 열심히 깃을 관리했는지 알 수 있답니다.
          </div>
        </div>
        <div className={st.subContent}>
          <div className={st.colorPallets}>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.orange}`}></div>&nbsp; : ~ 2018
            </div>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.purple}`}></div>&nbsp; :
              2019
            </div>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.green}`}></div>&nbsp; :
              2020
            </div>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.yellow}`}></div>&nbsp; :
              2021
            </div>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.blue}`}></div>&nbsp; :
              2022
            </div>
            <div className={st.pallet}>
              <div className={`${st.indicator} ${st.pink}`}></div>&nbsp;:
              2023
            </div>
          </div>
          <div className={st.colorManual}>
            팬톤이 선정한 년도 별 올해의 색상을 모티브하였습니다.
          </div>
        </div>
        <Image
          className={st.BlueEllipse}
          data-position={1}
          data-name={1}
          src={`/images/landing/main4/BlueEllipse.svg`}
          alt="스택"
          width={1360}
          height={460}
          draggable={false}
          priority
        />
        <Image
          className={st.Capture}
          data-position={1}
          data-name={1}
          src={`/images/landing/main4/Capture.svg`}
          alt="잔디"
          width={880}
          height={200}
          draggable={false}
          priority
        />
        <Image
          className={st.CircleGraph}
          data-position={1}
          data-name={1}
          src={`/images/landing/main4/CircleGraph.gif`}
          alt="스택"
          width={800}
          height={460}
          draggable={false}
          priority
        />
      </div>
    </>
  );
}
