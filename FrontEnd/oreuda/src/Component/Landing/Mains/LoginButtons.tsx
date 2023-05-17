import Link from "next/link";
import Image from "next/image";

import bt from "./LoginButtons.module.scss";

export default function LoginButtons() {
  return (
    <div className={bt.buttons}>
      <div className={bt.button}>
        <Link href={`${process.env.NEXT_PUBLIC_LOGIN_URL}`}>
          <div className={bt.github}>
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main1/Github.svg`}
              alt="폴더"
              width={32}
              height={32}
              draggable={false}
              priority
            />
            &nbsp; 로그인
          </div>
        </Link>
      </div>
      <div className={bt.button}>
        <Link
          href="https://chrome.google.com/webstore/detail/oreuda/hooeinlffeekoieamkdbbphnjmclpdmp?hl=ko"
          target="_black"
        >
          <div className={bt.extension}>
            <Image
              data-position={1}
              data-name={1}
              src={`/images/landing/main1/Google.svg`}
              alt="폴더"
              width={32}
              height={32}
              draggable={false}
              priority
            />
            &nbsp; 다운로드
          </div>
        </Link>
      </div>
    </div>
  );
}
