import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

import st from "./folder.module.scss";
import { useEffect, useState } from "react";

import { ChangeFolder } from "@/Api/Folders/changeFolder";
import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";

interface FolderList {
  id: number;
  name: string;
  color: string;
  order: number;
  repositoryCount: number;
}

export default function Folder(props: {
  clickDelete: boolean;
  folderListData: FolderList[];
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { clickDelete, folderListData, checkedItems, setCheckedItems } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [grab, setGrab] = useState<{ dataset: any }>();
  const [targetName, setTargetName] = useState<number>();
  const [targetPosition, setTargetPosition] = useState<number>();

  useEffect(() => {
    const changeFolderList = async () => {
      if (!targetName || !targetPosition) return;
      try {
        const res = await ChangeFolder(ACCESS_TOKEN, targetName, targetPosition);
      } catch (err: any) {
        if (err.response?.status == 401) {
          const token = await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
          saveCookiesAndRedirect(token.data.Authorization, token.data.RefreshToken);
          await ChangeFolder(ACCESS_TOKEN, targetName, targetPosition);
        }
      }
    };
    changeFolderList();
  }, [ACCESS_TOKEN, REFRESH_TOKEN, targetName, targetPosition]);

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDragStart = (e: any) => {
    setGrab(e.currentTarget);
  };

  const onDrop = (e: any) => {
    setTargetName(grab?.dataset.name);
    setTargetPosition(Number(e.target.dataset.position));
  };

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const currentIndex = checkedItems.indexOf(Number(value));
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(Number(value));
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  return (
    <div className={st.folders}>
      {folderListData?.map((e: FolderList, index: number) => {
        return (
          <div key={index}>
            <Link
              href={`/repository/${e.id}`}
              {...(clickDelete ? { onClick: handleClick } : {})}
              data-position={index}
              data-name={e.id}
              onDragOver={onDragOver}
              onDragStart={onDragStart}
              onDrop={onDrop}
              draggable={!clickDelete}
            >
              <div className={st.folder}>
                {clickDelete && (
                  <input
                    type="checkbox"
                    value={e.id}
                    checked={checkedItems.indexOf(e.id) !== -1}
                    onChange={handleCheckboxChange}
                    onClick={(event) => event.stopPropagation()}
                  />
                )}
                <div data-position={index} data-name={e.id}>
                  <Image
                    data-position={index}
                    data-name={e.id}
                    src={`images/folder/${e.color}.svg`}
                    alt="폴더"
                    width={128}
                    height={128}
                    draggable={false}
                  />
                </div>
                <p data-position={index} data-name={e.id}>
                  {e.name}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
