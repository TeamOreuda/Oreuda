import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import st from "./FolderHeader.module.scss";
import col from "../../styles/color.module.scss";

const FolderHeader = ({ folderName, folderColor }) => {
  const navigate = useNavigate();

  const back = () => {
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
