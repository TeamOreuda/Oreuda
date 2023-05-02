import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import st from "./repositorygraph.module.scss";

interface yearlyCommit {
  year: number;
  count: number;
}
[];

export default function repositorygraph(props: any) {
  ChartJS.register(ArcElement, Tooltip);
  const data = {
    labels: props.yearlyCommit.map((e: yearlyCommit) => {
      return e.year;
    }),
    datasets: [
      {
        data: props.yearlyCommit.map((e: yearlyCommit) => {
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
  console.log(data.datasets);

  const options = {
    responsive: false,

    // tooltips: {
    //   mode: "x" as const,
    //   intersect: true,
    //   backgroundColor: "#e3e3e3",
    // },
  };
  return (
    <div>
      <Doughnut data={data} width={72} height={72} className={st.doughnut} />
    </div>
  );
}
