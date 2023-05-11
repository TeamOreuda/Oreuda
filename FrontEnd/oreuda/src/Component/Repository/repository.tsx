import Link from "next/link";
import Image from "next/image";

import st from "./repository.module.scss";
import Repositorygraph from "./repositorygraph";
import { useEffect, useState } from "react";

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  starCount: number;
  isPrivate: string;
  updateDate: string;
  yearlyCommits: {
    year: number;
    count: number;
  }[];
  dailyCommit: {
    date: string;
    count: number;
  }[];
}

export default function Repository(props: { clickMove: boolean; repositoryList: Repository[] }) {
  const { clickMove, repositoryList } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // useEffect(() => {
  //   setCheckedItems([]);
  // }, [clickMove]);

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

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   const currentIndex = checkedItems.indexOf(value);
  //   const newCheckedItems = [...checkedItems];

  //   if (currentIndex === -1) {
  //     newCheckedItems.push(value);
  //   } else {
  //     newCheckedItems.splice(currentIndex, 1);
  //   }

  //   setCheckedItems(newCheckedItems);
  // };

  console.log(repositoryList);

  return (
    <div>
      {repositoryList?.map((e, index) => (
        <div key={index} className={st.body}>
          <div className={st.info}>
            <div className={st.infofirst}>
              {/* {props.clickMove && (
                <input
                  type="checkbox"
                  value={e.id}
                  checked={checkedItems.indexOf(String(e.id)) !== -1}
                  onChange={handleCheckboxChange}
                  onClick={(event) => event.stopPropagation()}
                />
              )} */}
              <Link href={e.url} className={st.link}>
                {e.name}
              </Link>
              <div>{e.isPrivate === "Y" ? "Private" : "Public"}</div>
            </div>
            <p>{e.description}</p>
            <div className={st.infosecond}>
              <div>
                {e.language && <div></div>}
                {e.language && <span>{e.language}</span>}
                <Image
                  className={st.img}
                  src="/images/repository/star.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{e.starCount}</span>
              </div>
              <span>Updated on {formattedDate(e.updateDate)}</span>
            </div>
          </div>
          <div>그래프</div>
          <Repositorygraph yearlyCommits={e.yearlyCommits} />
        </div>
      ))}
    </div>
  );
}
