import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";
import FolderHeader from "../../components/Folder/FolderHeader";
import RepoList from "../../components/Folder/RepoList";

const Folder = () => {
  const params = useParams();
  const { state } = useLocation();

  const { color, name } = state;
  console.log(name);
  const atk = useSelector((state) => state.accessToken.token);

  console.log(params.name);

  window.chrome.cookies.set({
    url: "http://localhost:3000",
    name: "page",
    value: "folder",
  });
  window.chrome.cookies.set({
    url: "http://localhost:3000",
    name: "folderID",
    value: params.name,
  });

  return (
    <>
      <Header />
      <FolderHeader folderName={name} folderColor={color} />
      <RepoList folderId={params.name} />
    </>
  );
};

export default Folder;
