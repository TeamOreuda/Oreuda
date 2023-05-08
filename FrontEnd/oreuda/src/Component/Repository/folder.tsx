import Link from "next/link";
import Image from "next/image";

import st from "./folder.module.scss";
import { useEffect, useState } from "react";

interface FolderList {
  id: number;
  name: string;
  color: string;
  order: number;
  repositoryCount: number;
}

const folderList: FolderList[] = [
  {
    id: 1,
    name: "FE",
    color: "blue",
    order: 1,
    repositoryCount: 23,
  },
  {
    id: 2,
    name: "BE",
    color: "green",
    order: 2,
    repositoryCount: 3,
  },
  {
    id: 3,
    name: "hello",
    color: "yellow",
    order: 3,
    repositoryCount: 15,
  },
  {
    id: 4,
    name: "Algo",
    color: "blue",
    order: 4,
    repositoryCount: 18,
  },
  {
    id: 5,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 6,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 7,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 8,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 9,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 10,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 11,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 12,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 13,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 14,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 15,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 16,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 17,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
  {
    id: 18,
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    id: 19,
    name: "몰라요",
    color: "yellow",
    order: 5,
    repositoryCount: 18,
  },
];

export default function Folder(props: { clickDelete: boolean }) {
  const [grab, setGrab] = useState({ dataset: { position: null } });
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    setCheckedItems([]);
  }, [props.clickDelete]);

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDragStart = (e: any) => {
    setGrab(e.currentTarget);
  };

  const onDrop = (e: any) => {
    let grabPosition = Number(grab.dataset.position);
    let targetPosition = Number(e.target.dataset.position);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
  };

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

  return (
    <div className={st.folders}>
      {folderList?.map((e: FolderList, index: number) => {
        return (
          <div key={index}>
            <Link
              href={`/repository/${e.id}`}
              {...(props.clickDelete ? { onClick: handleClick } : {})}
              data-position={index}
              onDragOver={onDragOver}
              onDragStart={onDragStart}
              onDrop={onDrop}
              draggable={!props.clickDelete}
            >
              <div className={st.folder}>
                {props.clickDelete && (
                  <input
                    type="checkbox"
                    value={e.id}
                    checked={checkedItems.indexOf(String(e.id)) !== -1}
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
