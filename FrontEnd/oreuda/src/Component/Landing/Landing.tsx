"use client";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import "aos/dist/aos.css";

import st from "./Landing.module.scss";

import LoginButtons from "./Mains/LoginButtons";
import Main1 from "./Mains/Main1";
import Main2 from "./Mains/Main2";
import Main3 from "./Mains/Main3";
import Main4 from "./Mains/Main4";
import Main5 from "./Mains/Main5";
import Main6 from "./Mains/Main6";
import Main7 from "./Mains/Main7";
import Footer from "./Mains/Footer";
import GoToTop from "./Mains/GoToTop";

export default function Landing() {
  const outerDivRef = useRef<HTMLDivElement | null>(null); // useRef 제네릭 타입 추가
  const [cord, setCord] = useState(30);
  const [currentPos, setCurrentPos] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const ACCESS_TOKEN = Cookies?.get("Authorization");
  const REFRESH_TOKEN = Cookies?.get("RefreshToken");

  if (ACCESS_TOKEN && REFRESH_TOKEN) {
    window.location.reload();
    Cookies.remove("Authorization");
    Cookies.remove("RefreshToken");
  }
  useEffect(() => {
    const outerDivRefCurrent = outerDivRef.current;

    if (outerDivRefCurrent) {
      outerDivRefCurrent.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setCord(0);
    }
  }, [isClicked]);
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const outerDivRefCurrent = outerDivRef.current;

      if (outerDivRefCurrent) {
        const { scrollTop } = outerDivRefCurrent;
        const pageHeight = window.innerHeight;
        setCord(0);
        if (deltaY > 0) {
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            // console.log("현재 1페이지, down");
            setCord((prev) => scrollTop);
            outerDivRefCurrent.scrollTo({
              top: pageHeight,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // console.log("현재 2페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
            // console.log("현재 3페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 3,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
            // console.log("현재 4페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 4,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
            // console.log("현재 5페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 5,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 6) {
            // console.log("현재 6페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 6,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 7) {
            // console.log("현재 7페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 7,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 8) {
            // console.log("현재 8페이지, down");
            setCord((prev) => scrollTop);

            outerDivRefCurrent.scrollTo({
              top: pageHeight * 8,
              left: 0,
              behavior: "smooth",
            });
          } else {
            // console.log("현재 footer, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 9,
              left: 0,
              behavior: "smooth",
            });
          }
        } else {
          if (scrollTop >= 0 && scrollTop <= pageHeight + 30) {
            // console.log("현재 1페이지, up");
            setCord((prev) => -1);
            outerDivRefCurrent.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 2 + 50
          ) {
            // console.log("현재 2페이지, up");
            setCord((prev) => scrollTop);
            outerDivRefCurrent.scrollTo({
              top: pageHeight,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 3 + 50
          ) {
            // console.log("현재 3페이지, up");
            setCord((prev) => scrollTop);
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 4 + 50
          ) {
            // console.log("현재 4페이지, up");
            setCord((prev) => scrollTop);
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 3,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 5 + 50
          ) {
            // console.log("현재 5페이지, up");
            setCord((prev) => scrollTop);
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 4,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 6 + 50
          ) {
            setCord((prev) => scrollTop);
            // console.log("현재 6페이지, up");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 5,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight &&
            scrollTop <= pageHeight * 7 + 50
          ) {
            // console.log("현재 7페이지, up");
            setCord((prev) => -1);
            outerDivRefCurrent.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } else {
            setCord((prev) => -1);
            // console.log("현재 8페이지, up");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 7,
              left: 0,
              behavior: "smooth",
            });
          }
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }

    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, []);

  useEffect(() => {
    console.log(cord);
  }, [cord]);

  return (
    <div ref={outerDivRef} className={st.page}>
      {/* <Header></Header> */}
      {(cord == 0 || cord >= window.innerHeight) &&
      cord < window.innerHeight * 7 ? (
        <LoginButtons />
      ) : (
        <></>
      )}

      <Main1 />
      <Main2 />
      <Main3 />
      <Main4 />
      <Main5 />
      <Main6 />
      <Main7 />
      <Footer />
      {cord >= window.innerHeight ? (
        <GoToTop isClicked={isClicked} setIsClicked={setIsClicked} />
      ) : (
        <></>
      )}
    </div>
  );
}
