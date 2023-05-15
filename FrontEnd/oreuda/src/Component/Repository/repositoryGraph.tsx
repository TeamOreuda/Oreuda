import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

import st from "./repositoryGraph.module.scss";
import { YearlyCommit } from "@/Component/Repository/repository";

export default function repositoryGraph(props: {
  yearlyCommits: YearlyCommit[];
}) {
  const { yearlyCommits } = props;
  ChartJS.register(ArcElement, Tooltip);
  const data = {
    labels: yearlyCommits?.map((e: YearlyCommit) => {
      return e.year == 2018 ? "2018 이전" : e.year;
    }),
    datasets: [
      {
        data: yearlyCommits?.map((e: YearlyCommit) => {
          return e.count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const options = {
    responsive: false,

    // tooltips: {
    //   mode: "x" as const,
    //   intersect: true,
    //   backgroundColor: "#e3e3e3",
    // },
  };
  return (
    <Doughnut
      data={data}
      options={options}
      className={st.doughnut}
      width={160}
      height={160}
    />
  );
}
