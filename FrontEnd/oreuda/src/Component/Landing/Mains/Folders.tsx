"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import st from "./Main2.module.scss";

export default function Folders() {
  const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    // console.log(counter);
  }, [counter]);

  return (
    <>
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/back_ellipse.svg`}
        className={st.ellipse}
        alt="타원"
        width={1037}
        height={1370}
        draggable={false}
      />
      {/* 폴더들 */}
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/1.svg`}
        className={`${st.folder1} ${st.folder1_drop}`}
        alt="폴더1"
        width={373}
        height={315}
        draggable={false}
        priority
      />
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/2.svg`}
        className={st.folder2}
        alt="폴더2"
        width={373}
        height={315}
        draggable={false}
        priority
      />
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/3.svg`}
        className={st.folder3}
        alt="폴더3"
        width={373}
        height={315}
        draggable={false}
        priority
      />

      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/4.svg`}
        className={st.folder4}
        alt="폴더4"
        width={373}
        height={315}
        draggable={false}
        priority
      />
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/5.svg`}
        className={st.folder5}
        alt="폴더5"
        width={373}
        height={315}
        draggable={false}
        priority
      />
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={counter}
        src={`images/landing/main2/6.svg`}
        className={st.folder6}
        alt="폴더6"
        width={373}
        height={315}
        draggable={false}
        priority
      />

      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={1}
        src={`images/landing/main2/7.svg`}
        className={st.folder7}
        alt="폴더7"
        width={373}
        height={315}
        draggable={false}
        priority
      />
      <Image
        key={`folder1-${counter}`}
        data-position={1}
        data-name={1}
        src={`images/landing/main2/8.svg`}
        className={st.folder8}
        alt="폴더8"
        width={373}
        height={315}
        draggable={false}
        priority
      />
    </>
  );

  // if (counter % 2 == 0) {
  //   return (
  //     <>
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/back_ellipse.svg`}
  //         className={st.ellipse}
  //         alt="타원"
  //         width={1037}
  //         height={1370}
  //         draggable={false}
  //       />
  //       {/* 폴더들 */}
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/1.svg`}
  //         className={`${st.folder1} ${st.folder1_drop}`}
  //         alt="폴더1"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/2.svg`}
  //         className={st.folder2}
  //         alt="폴더2"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/3.svg`}
  //         className={st.folder3}
  //         alt="폴더3"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />

  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/4.svg`}
  //         className={st.folder4}
  //         alt="폴더4"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/5.svg`}
  //         className={st.folder5}
  //         alt="폴더5"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/6.svg`}
  //         className={st.folder6}
  //         alt="폴더6"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />

  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/7.svg`}
  //         className={st.folder7}
  //         alt="폴더7"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/8.svg`}
  //         className={st.folder8}
  //         alt="폴더8"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <div className ={st.secret}>{counter}</div>
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/back_ellipse.svg`}
  //         className={st.ellipse}
  //         alt="타원"
  //         width={1037}
  //         height={1370}
  //         draggable={false}
  //       />
  //       {/* 폴더들 */}
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/1.svg`}
  //         className={`${st.folder1} ${st.folder1_drop}`}
  //         alt="폴더1"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={counter}
  //         src={`images/landing/main2/2.svg`}
  //         className={st.folder2}
  //         alt="폴더2"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/3.svg`}
  //         className={st.folder3}
  //         alt="폴더3"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />

  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/4.svg`}
  //         className={st.folder4}
  //         alt="폴더4"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/5.svg`}
  //         className={st.folder5}
  //         alt="폴더5"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/6.svg`}
  //         className={st.folder6}
  //         alt="폴더6"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />

  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/7.svg`}
  //         className={st.folder7}
  //         alt="폴더7"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //       <Image
  //         data-position={1}
  //         data-name={1}
  //         src={`images/landing/main2/8.svg`}
  //         className={st.folder8}
  //         alt="폴더`"
  //         width={373}
  //         height={315}
  //         draggable={false}
  //         priority
  //       />
  //     </>
  //   );
  // }
}
