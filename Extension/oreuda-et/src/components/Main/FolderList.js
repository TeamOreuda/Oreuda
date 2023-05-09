import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import st from "./FolderList.module.scss";

import Folder from "./Folder";
import Footer from "../../components/Main/Footer";
import FooterLabel from "../common/FooterLabel";

import { getFolderList } from "../../api/folder";
import { saveToken } from "../../store/tokenSlice";

const moveFolder = (id, order) => {
  console.log("id : " + id);
  console.log("order : " + order);
};

const FolderList = () => {
  const navigate = useNavigate();

  const [focusIdx, SetFocusIdx] = useState(-1);
  const [folders, setFolders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const atk = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    getFolderList(atk).then((response) => {
      console.log(response);
      setFolders(response);
      setIsLoading(true);
    });
  }, [atk]);

  if (isLoading) {
    return (
      <>
        <div className={st.folderList}>
          {folders.map((folder) => {
            return (
              <Folder
                folder={folder}
                id={folder.id}
                order={folder.order}
                focusIdx={focusIdx}
                SetFocusIdx={SetFocusIdx}
                moveFolder={moveFolder}
              />
            );
          })}
        </div>
        <Footer folders={folders} focusIdx={focusIdx} />
        <FooterLabel />
      </>
    );
  }
};

export default FolderList;
