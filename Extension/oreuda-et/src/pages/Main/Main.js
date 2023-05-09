import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Main/Header";
import FolderList from "../../components/Main/FolderList";

import { saveToken } from "../../store/tokenSlice";


const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.accessToken.token);

  const [isLoading, setIsLoading] = useState(true);

  const currentUrl = window.location.href;
  console.log("Main : " + currentUrl);

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
          console.log("The cookie is not found.");
          navigate("/");
        } else {
          console.log(cookie.value);
          dispatch(saveToken(cookie.value));
          setIsLoading(true);
        }
      }
    );

  }, []);

  if (isLoading) {
    if(test){
      console.log("test : " + test);
    }
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
