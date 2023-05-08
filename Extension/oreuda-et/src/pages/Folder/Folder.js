import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";
import FolderHeader from "../../components/Folder/FolderHeader";
import RepoList from "../../components/Folder/RepoList";

const Folder = () => {
  const params = useParams();
  console.log(params.name)
  // useEffect(() => {
  //   // 마지막 페이지를 저장하는 부분
  //   window.chrome.cookies.set({
  //     url: "http://localhost:3000",
  //     name: "page",
  //     value: "folder",
  //   });
  // }, []);


  return (
    <>
      <Header />

      <FolderHeader folderName = {params.name}/>
      <RepoList folderName = {params.name}/>

      {/* <Footer/> */}
    </>
  );
};

export default Folder;
