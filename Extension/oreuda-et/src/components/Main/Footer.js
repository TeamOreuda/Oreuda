import st from "./Footer.module.scss";

const Footer = () => {
  const cnt = 39;
  return (
    <div className={st.Footer}>
      <div className={st.repoCnt}>total {cnt} repository</div>
      <div className={st.link}>
        powered by{" "}
        <a
          href="https://www.notion.so/a1184fd74f9142b8ad5880e41a1e590d"
          target="_blank"
        >
          햣
        </a>
      </div>
    </div>
  );
};

export default Footer;
