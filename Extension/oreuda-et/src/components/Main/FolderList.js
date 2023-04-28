import { useNavigate } from "react-router-dom";

import st from "./FolderList.module.scss";

const folders = [
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderGreen.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "Data",
    img: "/assets/folderBlue.svg",
    index: "4",
    isIn: true,
  },
  {
    name: "Algorithm",
    img: "/assets/folderBlue.svg",
    index: "5",
    isIn: true,
  },
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderBlue.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "Data",
    img: "/assets/folderBlue.svg",
    index: "4",
    isIn: true,
  },
  {
    name: "Algorithm",
    img: "/assets/folderBlue.svg",
    index: "5",
    isIn: true,
  },
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderBlue.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "Data",
    img: "/assets/folderBlue.svg",
    index: "4",
    isIn: true,
  },
  {
    name: "Algorithm",
    img: "/assets/folderBlue.svg",
    index: "5",
    isIn: true,
  },
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderBlue.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "Data",
    img: "/assets/folderBlue.svg",
    index: "4",
    isIn: true,
  },
  {
    name: "Algorithm",
    img: "/assets/folderBlue.svg",
    index: "5",
    isIn: true,
  },
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderGreen.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "FE",
    img: "/assets/folderBlue.svg",
    index: "1",
    isIn: true,
  },
  {
    name: "Team Project",
    img: "/assets/folderPink.svg",
    index: "2",
    isIn: true,
  },
  {
    name: "BE",
    img: "/assets/folderGreen.svg",
    index: "3",
    isIn: true,
  },
  {
    name: "미분류",
    img: "/assets/folderGreen.svg",
    index: "3",
    isIn: true,
  },
];

const FolderList = () => {
  const navigate = useNavigate();

  const test = (key) => {
    console.log(key.name);
    navigate(`/folder/${key.name}`)
  };

  return (
    <div className={st.folderList}>
      {folders.map((key) => {
        if (key.name === "미분류" && key.isIn) {
          return (
            <div onClick={() => test(key)}>
              <div className={st.folderDiv}>
                <img className={st.folderImg} src="/assets/setting.svg"></img>
              </div>
              <div className={st.folderTitle}>{key.name}</div>
            </div>
          );
        }
        return (
          <div onClick={() => test(key)}>
            <div className={st.folderDiv}>
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
