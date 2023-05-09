import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import st from "./FolderList.module.scss";

import FolderItem from "./FolderItem";
import Footer from "../../components/Main/Footer";
import FooterLabel from "../common/FooterLabel";

import { getFolderList } from "../../api/folder";
import { rearrangeFolder } from "../../api/folder";

const FolderList = () => {
  const navigate = useNavigate();

  const [focusIdx, SetFocusIdx] = useState(-1);
  const [folders, setFolders] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const atk = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    getFolderList(atk).then((response) => {
      // console.log(response);
      setFolders(response);
      setIsLoading(true);
    });
  }, [atk]);

  useEffect(() => {
    getFolderList(atk).then((response) => {
      // console.log(response);
      setFolders(response);
      setIsLoading(true);
    });
  }, [isChanged]);

  const moveFolder = (id, order) => {
    console.log("id : " + id);
    console.log("order : " + order);

    // 여기서 axios 호출 한 다음 변환 값 화면에 적용
    rearrangeFolder(atk, id, order).then((response) => {
      console.log(response);
      setIsChanged(!isChanged);
    });
  };

  if (isLoading) {
    return (
      <>
        <div className={st.folderList}>
          {folders.map((folder) => {
            return (
              <FolderItem
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
