import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import st from "./repositorygraph.module.scss";

interface yearlyCommit {
  year: number;
  count: number;
}
[];

export default function repositorygraph(props: { yearlyCommits: yearlyCommit[] }) {
  const { yearlyCommits } = props;

  ChartJS.register(ArcElement, Tooltip);
  const data = {
    labels: yearlyCommits?.map((e: yearlyCommit) => {
      return e.year;
    }),
    datasets: [
      {
        data: yearlyCommits?.map((e: yearlyCommit) => {
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
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
  return <Doughnut data={data} className={st.doughnut} />;
}
