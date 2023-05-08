"use client";

import Image from "next/image";
import { useState } from "react";

import Repository from "@/Component/Repository/repository";
import st from "./page.module.scss";

export default function RepositoryPage() {
  const [moveRepository, setmoveRepository] = useState(false);

  const clickMove = () => {
    setmoveRepository(!moveRepository);
  };

  return (
    <div className={st.body}>
      <div className={st.button}>
        <button onClick={clickMove}>
          {moveRepository ? "확 인" : "폴더 이동"}
          <Image
            className={st.img}
            src="/images/repository/send.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
      </div>
      <hr />
      <Repository clickMove={moveRepository} />
    </div>
  );
}
