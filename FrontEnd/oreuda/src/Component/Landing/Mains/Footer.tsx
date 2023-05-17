import Image from "next/image";
import Link from "next/link";
import st from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <div className={st.layout}>
        <div className={st.icons}>
          <Link
            href="https://chrome.google.com/webstore/detail/oreuda/hooeinlffeekoieamkdbbphnjmclpdmp?hl=ko"
            target="_blank"
          >
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main6/Puzzle.svg`}
              alt="폴더"
              width={30}
              height={30}
              draggable={false}
              priority
            />
          </Link>
          <Link href="https://github.com/TeamOreuda/Oreuda" target="_blank">
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/footer/Github.svg`}
              alt="폴더"
              width={30}
              height={30}
              draggable={false}
              priority
            />
          </Link>
          <Link
            href="https://sprout-duckling-7b8.notion.site/32925d41ab6741dcbed82b75aeec14b5"
            target="_blank"
          >
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/footer/Notion.svg`}
              alt="폴더"
              width={30}
              height={30}
              draggable={false}
              priority
            />
          </Link>
        </div>
        <div className={st.copyright}>
          Copyright © 2023 Oreuda. All rights reserved.
        </div>
      </div>
    </>
  );
}
