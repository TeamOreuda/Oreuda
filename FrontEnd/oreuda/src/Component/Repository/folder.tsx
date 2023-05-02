import Link from "next/link";
import Image from "next/image";

import st from "./folder.module.scss";

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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
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
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
];

export default function folder() {
  return (
    <div className={st.folders}>
      {folderList.map((e: FolderList) => {
        return (
          <Link
            href={{
              pathname: `/repository/${e.id}`,
            }}
            key={e.id}
            className={st.folder}
          >
            <div>
              <Image src={`images/repository/${e.color}.svg`} alt="폴더" width={128} height={128} />
            </div>
            <p>{e.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
