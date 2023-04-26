import st from "./FolderList.module.scss";

const folders = [
  {
    name: "FE",
    img: "/assets/folderBlue.png",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.png",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderBlue.png",
    index: "3",
    isIn: true,
  },
  {
    name: "Data",
    img: "/assets/folderBlue.png",
    index: "4",
    isIn: true,
  }, {
    name: "Algorithm",
    img: "/assets/folderBlue.png",
    index: "5",
    isIn: true,
  },
];
const FolderList = () => {
  return (
    <div className={st.folderList}>
      {folders.map((key) => {
        return (
          <div>
            <div>
              <img className={st.folderImg} src={key.img}></img>
            </div>
            <div className={st.folderTitle}>{key.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FolderList;
