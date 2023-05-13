import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import st from "./repositoryGraph.module.scss";
import { YearlyCommit } from "@/Component/Repository/repository";

export default function repositoryGraph(props: {
  yearlyCommits: YearlyCommit[];
}) {
  const { yearlyCommits } = props;

  ChartJS.register(ArcElement, Tooltip);
  const data = {
    labels: yearlyCommits?.map((e: YearlyCommit) => {
      return e.year;
    }),
    datasets: [
      {
        data: yearlyCommits?.map((e: YearlyCommit) => {
          return e.count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
      width={180}
      height={180}
    />
  );
}
