"use client";

import { useState } from "react";
import st from "./Tech.module.scss";
import {
  selectReadme,
  setChoiceTechClear,
  setChoiceTechIndexChange,
  setModifyTech,
  setPushTech,
  setTechTitle,
} from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TechSelectBtn from "./TechSelectBtn";
import PlusTechBtn from "./PlusTechBtn";
import MinusTechBtn from "./MinusTechBtn";
import Image from "next/image";

export const techData: any = [
  { name: "선택해주세요", color: "0", index: 0 },
  { name: "javascript", color: "f1e05a", index: 1 },
  { name: "typescript", color: "31859c", index: 2 },
  { name: "dart", color: "98bad6", index: 3 },
  { name: "objective-c", color: "438eff", index: 4 },
  { name: "shell", color: "89e051", index: 5 },
  { name: "ruby", color: "701516", index: 6 },
  { name: "go", color: "375eab", index: 7 },
  { name: "php", color: "4f5d95", index: 8 },
  { name: "java", color: "b07219", index: 9 },
  { name: "scala", color: "7dd3b0", index: 10 },
  { name: "perl", color: "0298c3", index: 11 },
  { name: "swift", color: "ffac45", index: 12 },
  { name: "c", color: "555", index: 13 },
  { name: "cpp", color: "f34b7d", index: 14 },
  { name: "html5", color: "e44b23", index: 15 },
  { name: "rust", color: "dea584", index: 16 },
  { name: "assembly", color: "6e4c13", index: 17 },
  { name: "css", color: "563d7c", index: 18 },
  { name: "matlab", color: "bb92ac", index: 19 },
  { name: "r", color: "198ce7", index: 20 },
  { name: "python", color: "3581ba", index: 21 },
  { name: "jupyter-notebook", color: "36a2eb", index: 22 },
  { name: "other", color: "b8b7b7", index: 23 },
  { name: "node.js", color: "339933", index: 24 },
  { name: "react", color: "61DAFB", index: 25 },
  { name: "jquery", color: "0769AD", index: 26 },
  { name: "express", color: "000000", index: 27 },
  { name: "angular", color: "DD0031", index: 28 },
  { name: "vue.js", color: "4FC08D", index: 29 },
  { name: "django", color: "092E20", index: 30 },
  { name: "flask", color: "000000", index: 31 },
  { name: "next.js", color: "000000", index: 32 },
  { name: "spring", color: "6DB33F", index: 33 },
  { name: "springboot", color: "6DB33F", index: 34 },
  { name: "laravel", color: "FF2D20", index: 35 },
  { name: "flutter", color: "02569B", index: 36 },
  { name: "mysql", color: "4479A1", index: 37 },
  { name: "sqlite", color: "003B57", index: 38 },
  { name: "mariadb", color: "003545", index: 39 },
  { name: "mongodb", color: "47A248", index: 40 },
  { name: "redis", color: "DC382D", index: 41 },
  { name: "postgresql", color: "4169E1", index: 42 },
  { name: "microsoft sql server", color: "CC2927", index: 43 },
  { name: "oracle", color: "F80000", index: 44 },
  { name: "elasticsearch", color: "005571", index: 45 },
  { name: "kotlin", color: "7F52FF", index: 46 },
  { name: "jenkins", color: "D24939", index: 47 },
  { name: "docker", color: "2496ED", index: 48 },
  { name: "apachekafka", color: "231F20", index: 49 },
  { name: "kubernetes", color: "326CE5", index: 50 },
  { name: "svelte", color: "FF3E00", index: 51 },
  { name: "unity", color: "FFFFFF", index: 52 },
  { name: "amazonaws", color: "232F3E", index: 53 },
  { name: "figma", color: "F24E1E", index: 54 },
  { name: "git", color: "F05032", index: 55 },
  { name: "nginx", color: "009639", index: 56 },
  { name: "jirasoftware", color: "0052CC", index: 57 },
];

export default function Tech() {
  const techPlusWhole = useAppSelector(selectReadme).techPlusWhole;
  const techArr = useAppSelector(selectReadme).techArr;
  const techModifyArr = useAppSelector(selectReadme).techModifyArr;
  const techPlusModifyArr = useAppSelector(selectReadme).techPlusModifyArr;
  // console.log("techArr : ", techArr);
  // console.log("techPlusWhole : ", techPlusWhole);
  // console.log("techModifyArr : ", techModifyArr);
  // console.log("techPlusModifyArr : ", techPlusModifyArr);

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [techIdx, setTechIdx] = useState(0);
  const [curr, setCurr] = useState(0);
  const [modifyText, setModifyText] = useState("");
  const [optionVal, setOptionVal] = useState("");
  const [openModal, setOpenModal] = useState(false);

  let currTitle = "";
  const techTitle = useAppSelector(selectReadme).techTitle;
  const techPlusArr = useAppSelector(selectReadme).techPlusArr;
  // option select 변경했을 때 동작하는 메서드
  const onChangeTechOption = (data: any) => {
    if (curr === 0) dispatch(setPushTech({ data: techData[data], curr: curr }));
    else {
      dispatch(setPushTech({ data: techData[data], curr: curr }));
    }
    setOptionVal("선택해주세요");
  };

  const handleStateChange = (newState: number) => {
    setCurr(newState);
  };

  const cleanInput = () => {
    setTitle("");
    dispatch(setTechTitle(""));
    dispatch(setChoiceTechClear(0));
  };
  return (
    <div className={st.body}>
      <div className={st.indexBtns}>
        <Image
          src="/images/readme/plus.gif"
          alt=""
          className={st.btnDefault}
          width={40}
          height={40}
          onClick={() => {
            setCurr(0);
            setTitle("");
            dispatch(setChoiceTechClear(0));
          }}
        />
        {techPlusWhole?.map((el, index) => {
          return (
            <button
              key={Math.random() * (1000000 - 1)}
              onClick={() => {
                // setTitle(el.name);
                setModifyText(el.name);
                setTechIdx(el.index);
                setCurr(index + 1);
                dispatch(setChoiceTechIndexChange(el.techArray));
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className={st.titleDiv}>
        <span>기술(Tech Stacks)</span>
        <p>
          리드미에서 어필하고 싶은 기술들을 작성해보세요🤲
          <br />
          제목과 기술들을 선택하고 <strong className={st.strong}>추가</strong>를
          누르면 저장 완료!
        </p>
      </div>
      <div className={st.contentDiv}>
        <div className={st.mailDiv}>
          {/* <p>제목</p> */}
          <input
            className={st.TextTitleInput}
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              if (curr == 0) {
                setTitle(e.target.value);
                dispatch(setTechTitle(e.target.value));
              } else {
                // 해당 인덱스에 해당하는 값만 실시간으로 변경
                setModifyText(e.target.value);
                dispatch(setModifyTech({ data: e.target.value, idx: curr }));
              }
            }}
            value={curr == 0 ? title : modifyText}
          ></input>
        </div>
        {/* <div className={st.selectBox}>
          <span>기술 설정</span>
          <select
            className={st.selectSV}
            onChange={onChangeTechOption}
            value={optionVal}
          >
            {techData.map((data: any, index: number) => {
              return (
                <option value={index} key={Math.random() * (1000000 - 1)}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div> */}
        <div className={`${st.dropdown} ${openModal ? st.option : ""}`}>
          <input
            type="text"
            className={openModal ? st.focusInput : ""}
            placeholder="선택해주세요"
            readOnly
            value={optionVal}
            onClick={(e) => {
              setOpenModal(!openModal);
            }}
          />
          <div className={` ${openModal ? st.option : st.display}`}>
            {techData.map((data: any, index: number) => {
              if (index !== 0) {
                return (
                  <div
                    key={Math.random() * (1000000 - 1)}
                    onClick={(e) => {
                      setOptionVal(data.name);
                      setOpenModal(!openModal);
                      onChangeTechOption(index);
                    }}
                  >
                    {data.name}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={st.TechSelectBtnDiv}>
          <TechSelectBtn curr={curr} />
        </div>
        <div className={st.btnDiv}>
          {curr == 0 ? (
            <PlusTechBtn title={title} onStateChange={cleanInput} />
          ) : undefined}
          {techPlusWhole.length > 0 && curr !== 0 ? (
            <MinusTechBtn idx={techIdx} onStateChange={handleStateChange} />
          ) : undefined}
        </div>
      </div>
    </div>
  );
}
