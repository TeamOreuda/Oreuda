import Link from "next/link";
import Image from "next/image";

import st from "./repository.module.scss";
import fontColor from "../../Style/repository/languageColor.module.scss";
import Repositorygraph from "./repositorygraph";
import RepositoryGrassGraph from "./repositoryGrassGraph";

export interface DailyCommit {
  date: string;
  count: number;
}

export interface YearlyCommit {
  year: number;
  count: number;
}

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  starCount: number;
  isPrivate: string;
  updateDate: string;
  yearlyCommits: YearlyCommit[];
  dailyCommits: DailyCommit[];
}

export default function Repository(props: {
  clickMove: any;
  repositoryList: Repository[];
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { clickMove, repositoryList, checkedItems, setCheckedItems } = props;

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
      {repositoryList?.map((e, index) => (
        <div key={index} className={st.body}>
          <div className={st.info}>
            <div className={st.infofirst}>
              {clickMove && (
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
                {e.language && <div className={fontColor[e.language]}></div>}
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
          <RepositoryGrassGraph dailyCommits={e.dailyCommits} />
          <Repositorygraph yearlyCommits={e.yearlyCommits} />
        </div>
      ))}
    </div>
  );
}
