import st from "./FooterLabel.module.scss";

const FooterLabel = () => {
  return (
    <div className={st.link}>
      powered by{" "}
      <a
        href="https://www.notion.so/a1184fd74f9142b8ad5880e41a1e590d"
        target="_blank"
        className={st.git}
      >
        햣
      </a>
    </div>
  );
};

export default FooterLabel;
