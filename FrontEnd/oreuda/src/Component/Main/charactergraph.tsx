"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import st from "./charactergraph.module.scss";

interface Charactergraph {
  id: number;
  time: string;
  val: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Character(charactergraph: any) {
  const data = {
    datasets: [
      {
        fill: true,
        data: charactergraph?.map((e: Charactergraph) => {
          const date = `${e.time.substring(2, 4)}.${e.time.substring(5, 7)}.${e.time.substring(
            8,
            10
          )}`;
          return { x: date, y: e.val };
        }),
      },
    ],
  };

  const options = {
    responsive: false,

    tooltips: {
      mode: "x" as const,
      intersect: true,
      backgroundColor: "#e3e3e3",
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#efefef",
        },
      },
    },
  };

  return (
    <div>
      <div className={st.header}>
        <ul>성장 차트</ul>
      </div>
      <ul className={st.discription}>성장 곡선을 차트를 통해 확인해보세요</ul>
      <Line options={options} data={data} width={600} height={320} />
    </div>
  );
}
