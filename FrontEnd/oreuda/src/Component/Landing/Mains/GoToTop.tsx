import { Dispatch, SetStateAction } from "react";

import Image from "next/image";
import st from "./GoToTop.module.scss";
export default function GoToTop(props: {
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}) {
  const { isClicked, setIsClicked } = props;
  const goToTopClicked = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className={st.button} onClick={goToTopClicked}>
        <Image
          data-position={1}
          data-name={1}
          src={`images/landing/gototop/GoToTopBtn.svg`}
          className={st.btn}
          alt="폴더8"
          width={45}
          height={45}
          draggable={false}
          priority
        />
      </div>
    </>
  );
}
