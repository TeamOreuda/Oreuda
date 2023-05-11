import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

import st from "./folder.module.scss";
import { useEffect, useState } from "react";

import { getUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { saveCookiesAndRedirect } from "@/Api/Oauth/saveCookiesAndRedirect";
import { DeleteFolder } from "@/Api/Folders/deleteFolder";
import { GetRepositoryLst } from "@/Api/Repository/getRepositoryList";
import RepositoryGrassGraph from "./repositoryGrassGraph";

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
  const [grab, setGrab] = useState({ dataset: { position: null } });
  const [grabPosition, setGrabPosition] = useState(0);
  const [targetPosition, setTargetPosition] = useState(0);
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");

  // const deleteFolder = (folders: Array<number>) => {
  //   DeleteFolderList(ACCESS_TOKEN, { folders: folders })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch(async (err) => {
  //       if (err.response?.status == 401) {
  //         return await getUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN)
  //           .then(async (res) => {
  //             await saveCookiesAndRedirect(res.data.Authorization, res.data.RefreshToken);
  //             return await DeleteFolderList(ACCESS_TOKEN, { folders: checkedItems }).then((res) => {
  //               return res.data;
  //             });
  //           })

  //           .catch(() => {
  //             redirect("/");
  //           });
  //       }
  //     });
  // };

  // const onDragOver = (e: any) => {
  //   e.preventDefault();
  // };

  // const onDragStart = (e: any) => {
  //   setGrab(e.currentTarget);
  // };

  // const onDrop = (e: any) => {
  //   setGrabPosition(Number(grab.dataset.position));
  //   setTargetPosition(Number(e.target.dataset.position));
  // };

  // const handleClick = (e: any) => {
  //   e.preventDefault();
  // };

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
              // {...(clickDelete ? { onClick: handleClick } : {})}
              // data-position={index}
              // onDragOver={onDragOver}
              // onDragStart={onDragStart}
              // onDrop={onDrop}
              // draggable={!clickDelete}
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
                <div data-position={index}>
                  <Image
                    data-position={index}
                    src={`images/folder/${e.color}.svg`}
                    alt="폴더"
                    width={128}
                    height={128}
                    draggable={false}
                  />
                </div>
                <p data-position={index}>{e.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
