"use client";

import st from "./Main.module.scss";
import { selectReadme, setPushComponent } from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainSelectBtn from "./MainSelectBtn";
import NextBtn from "./NextBtn";
import { useState } from "react";

export const mainCompChoiceData: any = [
  "선택해주세요",
  "백준(Baek Joon)",
  "깃헙 스탯(Stats)",
  "주 사용 언어(Most Used Language)",
  "기술(Tech)",
  "연락처(Contacts)",
  "오르 캐릭터(Ore Character)",
  "추가 텍스트(Add Text)",
];

export default function Main() {
  /** componentList(컴포넌트 순서)
   * 0. (컴포넌트 요소 정하기)
   * 1. 백준(Baek Joon)
   * 2. 깃헙 스택(Github stack)
   * 3. 주 사용 언어(Most Used Language)
   * 4. 기술(Tech) - 두개 이상을 넣을 수 있도록
   * 5. 연락처(Contact)
   * 6. 오르 캐릭터(Ore Character)
   * 7. 추가 텍스트(Add Text) - 두개 이상을 넣을 수 있도록
   * 8. (박스 순서 배치)
   */
  const dispatch = useAppDispatch();
  const nextComp = useAppSelector(selectReadme).nextComp;
  const [optionVal, setOptionVal] = useState("선택해주세요");

  // option select 변경했을 때 동작하는 메서드
  const onChangeCompOption = (e: any) => {
    dispatch(setPushComponent(e.target.value));
    setOptionVal("선택해주세요");
  };

  return (
    <div className={st.readmeMain}>
      <div className={st.titleDiv}>
        <span>컴포넌트 요소 정하기</span>
        <p>리드미에 어떤 내용을 담을지 정해보세요.</p>
      </div>
      <select
        className={st.selectSV}
        onChange={onChangeCompOption}
        value={optionVal}
      >
        {mainCompChoiceData.map((data: string, index: number) => {
          return (
            <option value={index} key={index}>
              {data}
            </option>
          );
        })}
      </select>
      <MainSelectBtn />
      {nextComp.length > 0 ? <NextBtn /> : ""}
    </div>
  );
}
