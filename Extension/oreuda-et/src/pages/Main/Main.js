import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Main/Header";
import FolderList from "../../components/Main/FolderList";

const Main = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUrl = window.location.href;
  console.log("Main : " + currentUrl);

  // useEffect(() => {
  //   // 마지막 페이지를 저장하는 부분
  //   window.chrome.cookies.set({
  //     url: "http://localhost:3000",
  //     name: "page",
  //     value: "main",
  //   });
  // }, []);

  // 로그아웃 상태면 landing 페이지로 보내준다.
  // useEffect(() => {
  //   chrome.cookies.get(
  //     { url: "http://localhost:3000", name: "atk" },
  //     function (cookie) {
  //       if (!cookie) {
  //         console.log("The cookie is not found.");
  //         navigate("/");
  //       } else {
  //         console.log(cookie.value);
  //         setIsLoading(true);
  //       }
  //     }
  //   );
  // }, []);

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
