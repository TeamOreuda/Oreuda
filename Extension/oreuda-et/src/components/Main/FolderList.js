import { useState } from "react";
import { useNavigate } from "react-router-dom";

import st from "./FolderList.module.scss";

import Folder from "./Folder";
import Footer from "../../components/Main/Footer";
import FooterLabel from "../common/FooterLabel";
// const folders = [
//   {
//     name: "FE",
//     img: "/assets/folderBlue.svg",
//     color: "purple",
//     id: 1,
//     repositoryCount: 3,
//     order: 1,
//   },
//   {
//     name: "TeamProject ForSSAFY8thGeneration",
//     img: "/assets/folderPink.svg",
//     color: "black",
//     id: 2,
//     repositoryCount: 3,
//     order: 2,
//   },
//   {
//     name: "즐거운 팀프로젝트 룰루랄라",
//     img: "/assets/folderGreen.svg",
//     color: "green",
//     id: 3,
//     repositoryCount: 4,
//     order: 3,
//   },
//   {
//     name: "Team Project For SSAFY 8th Generation",
//     img: "/assets/folderBlue.svg",
//     color: "purple",
//     id: 4,
//     repositoryCount: 5,
//     order: 4,
//   },
//   {
//     name: "Algorithm",
//     img: "/assets/folderBlue.svg",
//     color: "yellow",
//     id: 5,
//     repositoryCount: 6,
//     order: 5,
//   },
//   {
//     name: "다라마바사아자차카타파하이건글자수테스트",
//     img: "/assets/folderBlue.svg",
//     color: "orange",
//     id: 6,
//     repositoryCount: 7,
//     order: 6,
//   },
//   {
//     name: "Team Project",
//     img: "/assets/folderPink.svg",
//     color: "blue",
//     id: 7,
//     repositoryCount: 8,
//     order: 7,
//   },
//   {
//     name: "BE",
//     img: "/assets/folderBlue.svg",
//     color: "orange",
//     id: 8,
//     repositoryCount: 9,
//     order: 8,
//   },
//   {
//     name: "Data",
//     img: "/assets/folderBlue.svg",
//     color: "purple",
//     id: 9,
//     repositoryCount: 1,
//     order: 9,
//   },
//   {
//     name: "Algorithm",
//     img: "/assets/folderBlue.svg",
//     color: "black",
//     id: 10,
//     repositoryCount: 2,
//     order: 10,
//   },
//   {
//     name: "김지환 123",
//     img: "/assets/folderBlue.svg",
//     color: "blue",
//     id: 11,
//     repositoryCount: 3,
//     order: 11,
//   },
//   {
//     name: "Team Project",
//     img: "/assets/folderPink.svg",
//     color: "blue",
//     id: 12,
//     repositoryCount: 4,
//     order: 12,
//   },
//   {
//     name: "BE",
//     img: "/assets/folderBlue.svg",
//     color: "blue",
//     id: 13,
//     repositoryCount: 5,
//     order: 13,
//   },
//   {
//     name: "Data",
//     img: "/assets/folderBlue.svg",
//     color: "blue",
//     id: 14,
//     repositoryCount: 6,
//     order: 14,
//   },
//   {
//     name: "Algorithm",
//     img: "/assets/folderBlue.svg",
//     color: "blue",
//     id: 15,
//     repositoryCount: 7,
//     order: 15,
//   },
//   {
//     name: "기본 폴더",
//     color: "white",
//     id: 16,
//     repositoryCount: 7,
//     order: 16,
//   },
// ];

const moveFolder = (id, order) =>{
  console.log("id : " + id);
  console.log("order : " + order)
}

const FolderList = () => {
  const navigate = useNavigate();
  const [focusIdx, SetFocusIdx] = useState(-1);
  const [folders, setFolders] = useState([
    {
      name: "FE",
      img: "/assets/folderBlue.svg",
      color: "purple",
      id: 1,
      repositoryCount: 3,
      order: 1,
    },
    {
      name: "TeamProject ForSSAFY8thGeneration",
      img: "/assets/folderPink.svg",
      color: "black",
      id: 2,
      repositoryCount: 3,
      order: 2,
    },
    {
      name: "즐거운 팀프로젝트 룰루랄라",
      img: "/assets/folderGreen.svg",
      color: "green",
      id: 3,
      repositoryCount: 4,
      order: 3,
    },
    {
      name: "Team Project For SSAFY 8th Generation",
      img: "/assets/folderBlue.svg",
      color: "purple",
      id: 4,
      repositoryCount: 5,
      order: 4,
    },
    {
      name: "Algorithm",
      img: "/assets/folderBlue.svg",
      color: "yellow",
      id: 5,
      repositoryCount: 6,
      order: 5,
    },
    {
      name: "다라마바사아자차카타파하이건글자수테스트",
      img: "/assets/folderBlue.svg",
      color: "orange",
      id: 6,
      repositoryCount: 7,
      order: 6,
    },
    {
      name: "Team Project",
      img: "/assets/folderPink.svg",
      color: "blue",
      id: 7,
      repositoryCount: 8,
      order: 7,
    },
    {
      name: "BE",
      img: "/assets/folderBlue.svg",
      color: "orange",
      id: 8,
      repositoryCount: 9,
      order: 8,
    },
    {
      name: "Data",
      img: "/assets/folderBlue.svg",
      color: "purple",
      id: 9,
      repositoryCount: 1,
      order: 9,
    },
    {
      name: "Algorithm",
      img: "/assets/folderBlue.svg",
      color: "black",
      id: 10,
      repositoryCount: 2,
      order: 10,
    },
    {
      name: "김지환 123",
      img: "/assets/folderBlue.svg",
      color: "blue",
      id: 11,
      repositoryCount: 3,
      order: 11,
    },
    {
      name: "Team Project",
      img: "/assets/folderPink.svg",
      color: "blue",
      id: 12,
      repositoryCount: 4,
      order: 12,
    },
    {
      name: "BE",
      img: "/assets/folderBlue.svg",
      color: "blue",
      id: 13,
      repositoryCount: 5,
      order: 13,
    },
    {
      name: "Data",
      img: "/assets/folderBlue.svg",
      color: "blue",
      id: 14,
      repositoryCount: 6,
      order: 14,
    },
    {
      name: "Algorithm",
      img: "/assets/folderBlue.svg",
      color: "blue",
      id: 15,
      repositoryCount: 7,
      order: 15,
    },
    {
      name: "기본 폴더",
      color: "white",
      id: 16,
      repositoryCount: 7,
      order: 16,
    },
  ])

  return (
    <>
      <div className={st.folderList}>
        {folders.map((folder) => {
          return (
            <Folder
              folder={folder}
              id = {folder.id}
              order = {folder.order}
              focusIdx={focusIdx}
              SetFocusIdx={SetFocusIdx}
              moveFolder = {moveFolder}
            />
          );
        })}
      </div>
      <Footer folders={folders} focusIdx={focusIdx} />
      <FooterLabel />
    </>
  );
};

export default FolderList;
