import { useParams, useLocation } from "react-router-dom";

import Header from "../../components/Main/Header";
import FolderHeader from "../../components/Folder/FolderHeader";
import RepoList from "../../components/Folder/RepoList";

import {
  setPageCookie,
  setFolderIDCookie,
  setColorCookie,
  setFolderNameCookie,
} from "../../api/cookie";

const Folder = () => {
  const params = useParams();
  const { state } = useLocation();

  const { color, name } = state;

  // console.log(params.name);

  setPageCookie("page");
  setFolderIDCookie(params.name);
  setColorCookie(color);
  setFolderNameCookie(name);

  return (
    <>
      <Header />
      <FolderHeader folderName={name} folderColor={color} />
      <RepoList folderId={params.name} />
    </>
  );
};

export default Folder;
