import st from "./FolderHeader.module.scss";

const FolderHeader = () => {
  const folderTitle = "Data";

  return (
    <div className={st.folderHeader}>
      <div className={st.backBtn}>
        <img className={st.backBtnIcon} src="/assets/back.svg"></img>
      </div>
      <div className={st.folderName}>{folderTitle}</div>
      <div className={st.folderIndicator}></div>
    </div>
  );
};

export default FolderHeader;
