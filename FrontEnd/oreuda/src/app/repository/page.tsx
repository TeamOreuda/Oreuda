"use client";

import Image from "next/image";
import { useState } from "react";

import st from "./page.module.scss";
import Folder from "@/Component/Repository/folder";
import AddFolder from "@/Component/Repository/addFolder";

export default function Repository() {
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const clickModal = () => {
    setShowModal(!showModal);
  };

  const clickDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div className={st.body}>
      <div className={st.button}>
        {showDelete ? null : (
          <button onClick={clickModal}>
            폴더 추가
            <Image
              className={st.img}
              src="images/repository/plus.svg"
              alt="plus"
              width={16}
              height={16}
            />
          </button>
        )}
        <button onClick={clickDelete}>
          {showDelete ? "확  인" : "폴더 삭제"}
          <Image
            className={st.img}
            src="images/repository/trash.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
      </div>
      <hr />
      {showModal && <AddFolder clickModal={clickModal} />}
      <Folder clickDelete={showDelete} />
    </div>
  );
}
