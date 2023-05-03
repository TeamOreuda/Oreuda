import st from "./FolderHeader.module.scss";
import col from "../../styles/color.module.scss";
import { useNavigate } from "react-router-dom";

const FolderHeader = () => {
  const navigate = useNavigate();
  const folderTitle = "Data";
  const folderColor = "purple";

  const back = () => {
    navigate(-1);
  }

  return (
    <div className={st.folderHeader}>
      <div className={st.backBtn}>
        <img className={st.backBtnIcon} onClick = {back} src="/assets/back.svg"></img>
      </div>
      <div className={st.folderName}>{folderTitle}</div>
      <div className={`${st.folderIndicator} ${col[folderColor]}`}></div>
    </div>
  );
};

export default FolderHeader;
