import st from "./FolderHeader.module.scss";
import col from "../../styles/color.module.scss";


const FolderHeader = () => {
  const folderTitle = "Data";
  const folderColor = "purple";

  return (
    <div className={st.folderHeader}>
      <div className={st.backBtn}>
        <img className={st.backBtnIcon} src="/assets/back.svg"></img>
      </div>
      <div className={st.folderName}>{folderTitle}</div>
      <div className={`${st.folderIndicator} ${col[folderColor]}`}></div>
    </div>
  );
};

export default FolderHeader;
