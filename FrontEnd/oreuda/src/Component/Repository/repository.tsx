import Link from "next/link";
import Image from "next/image";

import st from "./repository.module.scss";
import Repositorygraph from "./repositorygraph";
import { useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  star: number;
  isPrivate: string;
  updateDate: string;
  yearlyCommit: {
    year: number;
    count: number;
  }[];
  dailyCommit: {
    date: string;
    count: number;
  }[];
}

export default function Repository(props: { clickMove: boolean }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    setCheckedItems([]);
  }, [props.clickMove]);

  const repository: Repository[] = [
    {
      id: 1,
      name: "레포지토리 이름",
      description:
        "레포지토리 상세설명 : 이진트리를 다음의 규칙에 따라 행과 열에 번호가 붙어있는 격자 모양의 틀 속에 그리려고 한다. 이때 다음의 규칙에 따라 그리려고 한다.이와 같은 규칙에 따라 이진트리를 그릴 때 각 레벨의 너비는 그 레벨에 할당된 노드 중 가장 오른쪽에 위치한 노드의 열 번호에서 가장 왼쪽에 위치한 노드의 열 번호를 뺀 값 더하기 1로 정의한다.",
      url: "https://www.naver.com/",
      language: "python",
      star: 4,
      isPrivate: "Y",
      updateDate: "2023-04-03",
      yearlyCommit: [
        {
          year: 2023,
          count: 3,
        },

        {
          year: 2022,
          count: 4,
        },

        {
          year: 2021,
          count: 6,
        },

        {
          year: 2019,
          count: 26,
        },

        {
          year: 2018,
          count: 35,
        },
      ],
      dailyCommit: [
        {
          date: "2022-12-03",
          count: 3,
        },
        {
          date: "2023-02-04",
          count: 6,
        },
        {
          date: "2023-02-07",
          count: 4,
        },
        {
          date: "2023-03-09",
          count: 8,
        },
        {
          date: "2023-05-04",
          count: 9,
        },
        {
          date: "2023-06-23",
          count: 4,
        },
      ],
    },
  ];

  function formattedDate(date: string) {
    date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, (match, year, month, day) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[+month - 1]} ${+day}, ${year}`;
    });
    return date;
  }

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
    <div>
      {repository?.map((e) => (
        <div key={e.id} className={st.body}>
          <div className={st.info}>
            <div className={st.infofirst}>
              {props.clickMove && (
                <input
                  type="checkbox"
                  value={e.id}
                  checked={checkedItems.indexOf(String(e.id)) !== -1}
                  onChange={handleCheckboxChange}
                  onClick={(event) => event.stopPropagation()}
                />
              )}
              <Link href={e.url} className={st.link}>
                {e.name}
              </Link>
              <div>{e.isPrivate === "Y" ? "Private" : "Public"}</div>
            </div>
            <p>{e.description}</p>
            <div className={st.infosecond}>
              <div>
                <div></div>
                <span>{e.language}</span>
                <Image
                  className={st.img}
                  src="/images/repository/star.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{e.star}</span>
              </div>
              <span>Updated on {formattedDate(e.updateDate)}</span>
            </div>
          </div>
          <div>그래프</div>
          <Repositorygraph yearlyCommit={e.yearlyCommit} />
        </div>
      ))}
    </div>
  );
}
