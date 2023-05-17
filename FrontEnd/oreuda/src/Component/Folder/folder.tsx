import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

import EditFolder from "./editFolder";
import st from "./folder.module.scss";
import React, {
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";

import { ChangeFolder } from "@/Api/Folders/changeFolder";
import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookies } from "@/Api/Oauth/saveCookies";

export interface Folder {
  id: number;
  name: string;
  color: string;
  order: number;
  repositoryCount: number;
}

export default function Folder(props: {
  clickDelete: boolean;
  folderList: Folder[];
  checkedItems: number[];
  setCheckedItems: Dispatch<SetStateAction<number[]>>;
  loadFolderList: () => Promise<void>;
}) {
  const {
    clickDelete,
    folderList,
    checkedItems,
    setCheckedItems,
    loadFolderList,
  } = props;
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  const [openEdit, setOpenEdit] = useState(false);
  const [grab, setGrab] = useState<{ dataset: any }>();
  const [targetName, setTargetName] = useState<number>();
  const [targetPosition, setTargetPosition] = useState<number>();

  const changeFolderList = useCallback(async () => {
    if (!targetName || targetPosition == undefined) return;
    try {
      await ChangeFolder(ACCESS_TOKEN, targetName, targetPosition);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        await ChangeFolder(
          token.data.Authorization,
          targetName,
          targetPosition
        );
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN, targetName, targetPosition]);

  useEffect(() => {
    changeFolderList().then(() => loadFolderList());
  }, [ACCESS_TOKEN, REFRESH_TOKEN, changeFolderList, loadFolderList]);

  const onDragStart = (e: React.DragEvent<HTMLAnchorElement>) => {
    setGrab(e.currentTarget);
  };

  const onDrop = (e: React.DragEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTargetName(grab?.dataset.name);
    setTargetPosition(Number(e.currentTarget.dataset.position));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currentIndex = checkedItems.indexOf(Number(value));
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(Number(value));
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  const changeFolder = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <div className={st.folders}>
      {folderList?.map((folder: Folder, index: number) => {
        return (
          <div key={index} data-position={index} className={st.folder}>
            <Link
              href={`/repository/${folder.id}`}
              {...(clickDelete ? { onClick: (e) => e.preventDefault() } : {})}
              data-position={index}
              data-name={folder.id}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={onDragStart}
              onDrop={onDrop}
              draggable={!clickDelete}
              className={st.folderDiv}
            >
              {clickDelete && folder.name !== "기본 폴더" && (
                <input
                  type="checkbox"
                  value={folder.id}
                  checked={checkedItems.indexOf(folder.id) !== -1}
                  onChange={handleCheckboxChange}
                  onClick={(event) => event.stopPropagation()}
                />
              )}
              <div data-position={index} data-name={folder.id}>
                <Image
                  data-position={index}
                  data-name={folder.id}
                  src={`images/folder/${folder.color}.svg`}
                  alt="폴더"
                  width={128}
                  height={128}
                  draggable={false}
                  priority
                />
              </div>
            </Link>
            <div
              className={st.folderName}
              data-position={index}
              data-name={folder.id}
              onClick={changeFolder}
            >
              {openEdit && (
                <EditFolder folderId={folder.id} changeFolder={changeFolder} />
              )}
              {folder.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
