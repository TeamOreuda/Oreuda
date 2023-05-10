import { useNavigate } from "react-router-dom";

import st from "./FolderHeader.module.scss";
import col from "../../styles/color.module.scss";

import {
  removeFolderIdCookie,
  removeColorCookie,
  removeFolderNameCookie,
} from "../../api/cookie";

const FolderHeader = ({ folderName, folderColor }) => {
  const navigate = useNavigate();

  const back = () => {
    removeFolderIdCookie();
    removeColorCookie();
    removeFolderNameCookie();

    navigate(-1);
  };

  return (
    <div className={st.folderHeader}>
      <div className={st.backBtn}>
        <img
          className={st.backBtnIcon}
          onClick={back}
          src="/assets/back.svg"
        ></img>
      </div>
      <div className={st.folderName}>{folderName}</div>
      <div className={`${st.folderIndicator} ${col[folderColor]}`}></div>
    </div>
  );
};

export default FolderHeader;
