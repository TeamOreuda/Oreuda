"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import Repository from "@/Component/Repository/repository";
import st from "./page.module.scss";

export default function RepositoryPage() {
  const params = useParams();

  return (
    <div className={st.body}>
      <div className={st.button}>
        <button>
          폴더 이동
          <Image
            className={st.img}
            src="/images/repository/send.svg"
            alt="send"
            width={16}
            height={16}
          />
        </button>
      </div>
      <hr />
      <Repository />
    </div>
  );
}
