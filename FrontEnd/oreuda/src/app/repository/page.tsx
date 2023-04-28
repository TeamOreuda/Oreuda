import Image from "next/image";

import st from "./page.module.scss";
import Folder from "@/Component/Repository/folder";

export default function Repository() {
  return (
    <div className={st.body}>
      <div className={st.button}>
        <button>
          폴더 추가
          <Image
            className={st.img}
            src="images/repository/plus.svg"
            alt="plus"
            width={16}
            height={16}
          />
        </button>
        <button>
          폴더 삭제
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
      <Folder />
    </div>
  );
}
