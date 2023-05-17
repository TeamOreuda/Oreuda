import Image from "next/image";

import st from "./Footer.module.scss"

export default function Footer() {
  return (
    <>
      <div className={st.layout}>
        <div className={st.icons}>
        <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main6/Puzzle.svg`}
              alt="폴더"
              width={32}
              height={32}
              draggable={false}
              priority
            />
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main1/github.svg`}
              alt="폴더"
              width={32}
              height={32}
              draggable={false}
              priority
            />
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main1/github.svg`}
              alt="폴더"
              width={32}
              height={32}
              draggable={false}
              priority
            />
        </div>
        <div></div>
      </div>
    </>
  );
}
