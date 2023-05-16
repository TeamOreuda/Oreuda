import Image from "next/image";

import pg from "../Landing.module.scss";
import bt from "./login_buttons.module.scss";
import st from "./Main4.module.scss";

export default function Main4() {
  return (
    <div className={`${pg.page} ${st.layout}`}>
      {/* content 영역 */}
      <div>
        <div>
          오르와 함께 <span className={st.highlight}>성장하세요!</span>
        </div>
        <div>
          사용자의 깃헙 활동을 분석하여 오르가 성장합니다.
          <br />
          단, 활동을 안하면 오르가 다시
          <Image
            className={st.stacks}
            data-position={1}
            data-name={1}
            src={`/images/character/CrySoil.svg`}
            alt="스택"
            width={52}
            height={50}
            draggable={false}
            priority
          />
          으로 돌아갈 수 있으니 주의해주세요!
        </div>

        {/* 캐릭터 변환 표시 영역 */}
        <div>
          <Image
            className={st.stacks}
            data-position={1}
            data-name={1}
            src={`/images/character/Soil.svg`}
            alt="스택"
            width={300}
            height={280}
            draggable={false}
            priority
          />

          <Image
            className={st.stacks}
            data-position={1}
            data-name={1}
            src={`/images/landing/main4/arrow.svg`}
            alt="스택"
            width={50}
            height={86}
            draggable={false}
            priority
          />

          <Image
            className={st.stacks}
            data-position={1}
            data-name={1}
            src={`/images/character/Earth.svg`}
            alt="스택"
            width={450}
            height={420}
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* img 영역 */}
      <div></div>
    </div>
  );
}
