import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import st from "./RepoList.module.scss";
import RepoItem from "./RepoItem";
import FooterLabel from "../common/FooterLabel";

import { getFolderList } from "../../api/folder";
import { getRepoList } from "../../api/repo";

const RepoList = ({ folderId }) => {
  const [repoList, setRepoList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [dropDownIndex, setDropDownIndex] = useState(-1);
  const [isMoved, setIsMoved] = useState(false);

  const atk = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    // console.log(folderId);
    // folderName을 기반으로 axios해온다.
    getFolderList(atk).then((response) => {
      setFolderList(response);
    });
    getRepoList(atk, folderId).then((response) => {
      setRepoList(response);
    });
  }, [atk]);

  // 폴더가 이동하면 화면을 다시 렌더링한다.
  useEffect(() => {
    // console.log("화면이 바뀜 isMoved : ", isMoved);
    getFolderList(atk).then((response) => {
      setFolderList(response);
    });
    getRepoList(atk, folderId).then((response) => {
      setRepoList(response);
    });
  }, [isMoved]);

  return (
    <>
      <div className={st.cardList}>
        {repoList.map((repo) => {
          return (
            <RepoItem
              repo={repo}
              folderId = {folderId}
              folderList={folderList}
              dropDownIndex={dropDownIndex}
              setDropDownIndex={setDropDownIndex}
              isMoved={isMoved}
              setIsMoved={setIsMoved}
            />
          );
        })}
      </div>
      <FooterLabel />
    </>
  );
};

export default RepoList;
