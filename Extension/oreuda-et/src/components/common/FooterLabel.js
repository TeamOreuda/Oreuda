import st from "./FooterLabel.module.scss";

const FooterLabel = () => {
  return (
    <div className={st.link}>
      더 많은 기능을 {" "}
      <a href="https://oreuda.kr/" target="_blank" className={st.git}>
        햣
      </a>에서 경험해보세요!
    </div>
  );
};

export default FooterLabel;
