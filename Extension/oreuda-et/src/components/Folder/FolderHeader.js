import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import st from "./FolderHeader.module.scss";
import col from "../../styles/color.module.scss";

const FolderHeader = ({ folderName }) => {
  const navigate = useNavigate();
  const [folderList, setFolderList] = useState([]);
  const [folderColor, setFolderColor] = useState();

  useEffect(() => {
    setFolderList([
      {
        id: 1,
        name: "FE",
        color: "blue",
        order: 1,
        repositoryCount: 3,
      },
      {
        id: 2,
        name: "BE",
        color: "pink",
        order: 2,
        repositoryCount: 3,
      },
      {
        id: 3,
        name: "Team Project For SSAFY 8th Generation",
        color: "green",
        order: 3,
        repositoryCount: 3,
      },
      {
        id: 4,
        name: "기본 폴더",
        color: "white",
        order: 4,
        repositoryCount: 3,
      },
    ]);
    folderList.map((key) => {
      if (key.name === folderName) {
        setFolderColor(key.color);
      }
    });
  }, []);
  console.log(folderColor)
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
