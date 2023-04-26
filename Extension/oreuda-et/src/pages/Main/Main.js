import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Main/Header";
import FolderList from "../../components/Main/FolderList";

const Main = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const chrome = window.chrome;

  const currentUrl = window.location.href;
  console.log("Main : " + currentUrl);

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
        <FolderList></FolderList>
      </>
    );
  }
};
export default Main;
