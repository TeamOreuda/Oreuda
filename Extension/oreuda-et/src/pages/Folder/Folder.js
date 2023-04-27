import { useParams } from "react-router-dom";

import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";
import FolderHeader from "../../components/Folder/FolderHeader";
import RepoList from "../../components/Folder/RepoList";

const Folder = () => {
  const params = useParams();
  return (
    <>
      <Header></Header>

      <FolderHeader></FolderHeader>
      <RepoList></RepoList>

      <Footer></Footer>
    </>
  );
};

export default Folder;
