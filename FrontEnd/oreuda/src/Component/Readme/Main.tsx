"use client";

import st from "./Main.module.scss";
import {
  selectReadme,
  setClearReadmeStore,
  setIsSaveReadme,
  setLoadDataMapping,
  setPushComponent,
} from "@/store/modules/readme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainSelectBtn from "./MainSelectBtn";
import NextBtn from "./NextBtn";
import { useEffect, useState } from "react";
import { GetHasReadme } from "@/Api/Readme/getHasReadme";
import Cookies from "js-cookie";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { GetLoadReadme } from "@/Api/Readme/getLoadReadme";

export const mainCompChoiceData: any = [
  "선택해주세요",
  "백준(Baek Joon)",
  "깃헙 스탯(Stats)",
  "주 사용 언어(Most Used Language)",
  "기술(Tech Stacks)",
  "연락처(Contacts)",
  "오르 캐릭터(Ore)",
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

  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const dispatch = useAppDispatch();
  const nextComp = useAppSelector(selectReadme).nextComp;
  const githubId = useAppSelector(selectReadme).githubId;
  const isSaveReadme = useAppSelector(selectReadme).isSaveReadme;

  const [optionVal, setOptionVal] = useState("선택해주세요");
  const [wasSaveReadme, setWasSaveReadme] = useState(false);
  // option select 변경했을 때 동작하는 메서드
  const onChangeCompOption = (e: any) => {
    dispatch(setPushComponent(e.target.value));
    setOptionVal("선택해주세요");
  };

  const onClickLoadReadme = () => {
    if (
      window.confirm(
        "저장된 데이터를 불러오시겠습니까? 저장하지 않은 기존 데이터는 없어집니다."
      )
    ) {
      // 기존에 저장을 눌러 작성된 데이터가 있는지 확인하는 axios
      const isLoadReadme = async () => {
        try {
          const res = await GetLoadReadme(ACCESS_TOKEN);
          // console.log(res.data);

          // store 초기화
          dispatch(setClearReadmeStore(0));
          // store에 저장
          dispatch(setLoadDataMapping(res.data));
          // res.data.map((el: any, index: any) => {
          //   // 순서대로 리스트에 넣기

          // })
        } catch (err: any) {
          if (err.response?.status == 401) {
            const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
            saveCookiesAndRedirect(
              token.data.Authorization,
              token.data.RefreshToken
            );
            try {
              const res = await GetHasReadme(ACCESS_TOKEN);
              // store에 저장
            } catch (error) {
              // redirect("/landing")
            }
          } else {
            // redirect("/landing")
          }
        }
      };
      isLoadReadme();
    }
  };

  useEffect(() => {
    // 기존에 저장을 눌러 작성된 데이터가 있는지 확인하는 axios
    const hasReadme = async () => {
      try {
        const res = await GetHasReadme(ACCESS_TOKEN);
        setWasSaveReadme(true);
        dispatch(setIsSaveReadme(res.data));
        // store에 저장
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookiesAndRedirect(
            token.data.Authorization,
            token.data.RefreshToken
          );
          try {
            const res = await GetHasReadme(ACCESS_TOKEN);
            // store에 저장
          } catch (error) {
            // redirect("/landing")
          }
        } else {
          // redirect("/landing")
        }
      }
    };
    hasReadme();
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);
  return (
    <div className={st.readmeMain}>
      <div className={st.titleDiv}>
        <span>리드미 요소 정하기</span>
        <p>리드미에 어떤 내용을 담을지 선택해보세요.</p>
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
      <button
        onClick={onClickLoadReadme}
        className={`${st.loadReadmeBtn} ${
          isSaveReadme ? undefined : st.disabledBtn
        }`}
        disabled={!isSaveReadme}
      >
        불러오기
      </button>
      {nextComp.length > 0 ? <NextBtn /> : ""}
    </div>
  );
}
