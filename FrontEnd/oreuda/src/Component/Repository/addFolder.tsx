"use client";

import Image from "next/image";
import { useState } from "react";

import st from "./addFolder.module.scss";
import fontColor from "../../Style/repository/folderColor.module.scss";

export default function AddFolder(props: { clickModal: any }) {
  const items = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"];

  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const colorList = ["yellow", "orange", "red", "green", "blue", "purple", "black"];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const currentIndex = checkedItems.indexOf(value);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(value);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  const makeFolder = () => {
    props.clickModal();
  };

  return (
    <div className={st.modalBox} onClick={props.clickModal}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <Image src="/images/folder/white.svg" alt="" width={48} height={48} />
          <button onClick={() => makeFolder()}>확인</button>
        </div>
        <p>폴더명</p>
        <input
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
          placeholder="폴더명을 입력해주세요"
        />
        <p>색상</p>
        <div>
          {colorList.map((e: string) => {
            return (
              <div
                key={e}
                className={`${fontColor[e]} ${folderColor === e ? st.select : ""}`}
                onClick={() => setFolderColor(e)}
              />
            );
          })}
        </div>
        <p>추가할 레포지토리</p>
        <div className={st.checkItem}>
          {items.map((item) => (
            <div key={item}>
              <input
                type="checkbox"
                value={item}
                checked={checkedItems.indexOf(item) !== -1}
                onChange={handleCheckboxChange}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
