import pg from "../Landing.module.scss";
import st from "./Main4.module.scss";
export default function Main4() {
  return (
    <>
      <div className={`${pg.page} ${st.layout}`}>
        {/* content */}
        <div className={st.content}>
          <div className={st.title}>
            레포지토리들을 쉽게 <span className={st.highlight}>정렬</span>
            해보세요!
          </div>
          <div>
            최신순, 커밋순, 이름순, 별점순 원하는 정렬 기준으로 레포지토리들을
            확인해 보세요!
            <br></br>
            <br></br>
            레포지토리마다의 잔디를 확인해 보세요. 그래프는 연도별 커밋수를
            나타냅니다.
            <br></br>몇 년도에 가장 열심히 깃을 관리했는지 알 수 있답니다.
          </div>
        </div>
      </div>
    </>
  );
}
