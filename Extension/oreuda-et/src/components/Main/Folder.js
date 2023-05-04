import { useState } from "react";
import { useNavigate } from "react-router-dom";
import st from "./FolderList.module.scss";
import folderSt from "./Folder.module.scss";

const Folder = ({ folder, focusIdx, SetFocusIdx }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const doubleClick = (key) => {
    console.log(key.name);
    navigate(`/folder/${key.name}`);
  };

  const focusHandler = () => {
    if (isFocused && folder.id === focusIdx) {
      setIsFocused(false);
      SetFocusIdx(-1);
    } else {
      setIsFocused(true);
      SetFocusIdx(folder.id);
    }
  };

  // if (folder.name === "기본 폴더" && folder.repositoryCount) {
  //   return (
  //     <div onDoubleClick={() => doubleClick(folder)} draggable="true">
  //       <div className={st.folderDiv}>
  //         <img className={st.folderImg} src="/assets/folders/white.svg"></img>
  //       </div>
  //       <div className={st.folderTitle}>{folder.name}</div>
  //     </div>
  //   );
  // } else {
  return (
    <div
      onDoubleClick={() => doubleClick(folder)}
      onClick={() => focusHandler()}
      className={`${
        isFocused && focusIdx === folder.id
          ? folderSt.focused
          : folderSt.unFocused
      } ${folderSt.folderItem}`}
    >
      <div className={folderSt.blink}>&nbsp;</div>
      <div className={st.folderDiv}>
        <img
          className={st.folderImg}
          src={`/assets/folders/${folder.color}.svg`}
        ></img>
      </div>
      <div className={st.folderTitle}>{folder.name}</div>
    </div>
  );
  // }
};

export default Folder;
