import { DailyCommit } from "@/Component/Repository/repository";
import CalendarHeatmap from "react-calendar-heatmap";
import "./heatmap.css";

export default function RepositoryGrassGraph(props: {
  dailyCommits: DailyCommit[];
}) {
  const { dailyCommits } = props;
  console.log("dailyCommits", dailyCommits);
  // const data = [];
  // const startDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
  // let y = 0,
  //   x = 0,
  //   val: number,
  //   idx = 0;
  // for (let i = 0; i < 180; i++) {
  //   val = 0;
  //   if (
  //     idx < dailyCommits.length &&
  //     dailyCommits[idx].date === now.toISOString().slice(0, 10)
  //   ) {
  //     val = dailyCommits[idx].count;
  //     idx++;
  //   }
  //   data.push([y, x, val]);
  //   now.setDate(now.getDate() + 1);
  //   x++;
  //   if (x > 6) {
  //     x = 0;
  //     y++;
  //   }
  // }
  const std = Math.max(...dailyCommits.map((v) => v.count)) / 4;
  console.log(std);
  const getScale = (value: number) => {
    if (value === 0) {
      return "color-empty";
    }
    if (value < std) {
      return "color-commit-1";
    }
    if (value < std * 2) {
      return "color-commit-2";
    }
    if (value < std * 3) {
      return "color-commit-3";
    }
    return "color-commit-4";
  };

  return (
    <CalendarHeatmap
      // startDate={new Date(Date.now() - 181 * 24 * 60 * 60 * 1000)}
      // endDate={Date.now()}
      values={dailyCommits}
      classForValue={(value) => {
        if (!value) {
          return "color-empty";
        }
        return getScale(value.count);
      }}
    />
  );
}
