import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Main/Header";
import FolderList from "../../components/Main/FolderList";

import { saveToken } from "../../store/tokenSlice";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [targetColor, setTargetColor] = useState("");
  const [targetName, setTargetName] = useState("");
  const [targetFolderId, setTargetFolderId] = useState("");

  // const currentUrl = window.location.href;
  // console.log("Main : " + currentUrl);

  useEffect(() => {
    // 마지막 페이지를 저장하는 부분
    window.chrome.cookies.set({
      url: process.env.REACT_APP_DOMAIN,
      name: "page",
      value: "main",
    });
    
  }, []);

  // 로그아웃 상태면 landing 페이지로 보내준다.
  useEffect(() => {
    window.chrome.cookies.get(
      { url: process.env.REACT_APP_DOMAIN, name: "Authorization" },
      function (cookie) {
        if (!cookie) {
          navigate("/");
        } else {
          // console.log(cookie.value);
          dispatch(saveToken(cookie.value));
          setIsLoading(true);
        }
      }
    );

    window.chrome.cookies.get(
      { url: process.env.REACT_APP_DOMAIN, name: "folderID" },
      function (folderID) {
        if (folderID) {
          setTargetFolderId(folderID.value)
          window.chrome.cookies.get(
            { url: process.env.REACT_APP_DOMAIN, name: "color" },
            function (color) {
              if (color) {
                setTargetColor(color.value);
              }
            }
          );
          window.chrome.cookies.get(
            { url: process.env.REACT_APP_DOMAIN, name: "folderName" },
            function (name) {
              if (name) {
                setTargetName(name.value);
              }
            }
          );
        }
      }
    );
  }, []);

  useEffect(() => {
    if(targetName && targetColor && targetFolderId){
      navigate(`/folder/${targetFolderId}`, {
        state: { color: targetColor, name: targetName },
      });
    }
  }, [targetName]);

  if (isLoading) {
    return (
      <>
        <Header></Header>
        <DndProvider backend={HTML5Backend}>
          <FolderList></FolderList>
        </DndProvider>
      </>
    );
  }
};
export default Main;
