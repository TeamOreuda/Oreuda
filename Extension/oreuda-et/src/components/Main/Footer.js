import st from "./Footer.module.scss";
import fontColor from "../../styles/fontColor.module.scss";

const Footer = ({ focusIdx, folders }) => {
  const cnt = folders.length;

  let sum = 0;
  folders.map((key) => {
    sum += key.repositoryCount;
  });


  if (focusIdx === -1) {
    return (
      <div className={st.Footer}>
        <div className={st.repoTitle}>
          Total {sum} Repositories, {cnt} Folders
        </div>
      </div>
    );
  } else {
    return (
      <div className={st.Footer}>
        <div
          className={`${st.repoTitle} ${
            fontColor[folders[focusIdx].color]
          }`}
        >
          {folders[focusIdx].name}
        </div>
        <div className={st.repoCnt}>
          {folders[focusIdx].repositoryCount} Repositories in This Folder
        </div>
      </div>
    );
  }
};

export default Footer;
