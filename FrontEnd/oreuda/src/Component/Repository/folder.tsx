import Image from "next/image";

import st from "./folder.module.scss";

interface FolderList {
  name: string;
  color: string;
  order: number;
  repositoryCount: number;
}

const folderList: FolderList[] = [
  {
    name: "FE",
    color: "blue",
    order: 1,
    repositoryCount: 23,
  },
  {
    name: "BE",
    color: "green",
    order: 2,
    repositoryCount: 3,
  },
  {
    name: "hello",
    color: "pink",
    order: 3,
    repositoryCount: 15,
  },
  {
    name: "Algo",
    color: "blue",
    order: 4,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
  {
    name: "알려줘",
    color: "green",
    order: 6,
    repositoryCount: 18,
  },
  {
    name: "몰라요",
    color: "pink",
    order: 5,
    repositoryCount: 18,
  },
];

const fakeBox: Array<number> = [];
for (let i: number = 0; i < folderList.length % 5; i++) {
  fakeBox.push(1);
}

export default function folder() {
  return (
    <div className={st.folders}>
      {folderList.map((e: FolderList) => {
        return (
          <div key={e.order} className={st.folder}>
            <div>
              <Image src={`images/repository/${e.color}.svg`} alt="폴더" width={128} height={128} />
            </div>
            <p>{e.name}</p>
          </div>
        );
      })}
      {fakeBox.map((e) => {
        return <div key={e} className={st.fake} />;
      })}
    </div>
  );
}
