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
  date: string;
  value: number;
}

const charactergraph: Charactergraph[] = [
  {
    date: "2023-03-01",
    value: 330,
  },
  {
    date: "2023-03-02",
    value: 321,
  },
  {
    date: "2023-03-03",
    value: 341,
  },
  {
    date: "2023-03-04",
    value: 334,
  },
  {
    date: "2023-03-05",
    value: 324,
  },
  {
    date: "2023-03-06",
    value: 327,
  },
  {
    date: "2023-03-07",
    value: 335,
  },
  {
    date: "2023-03-08",
    value: 324,
  },
  {
    date: "2023-03-09",
    value: 334,
  },
  {
    date: "2023-03-10",
    value: 332,
  },
  {
    date: "2023-03-11",
    value: 323,
  },
  {
    date: "2023-03-12",
    value: 326,
  },
  {
    date: "2023-03-13",
    value: 328,
  },
  {
    date: "2023-03-14",
    value: 332,
  },
  {
    date: "2023-03-15",
    value: 330,
  },
  {
    date: "2023-03-16",
    value: 328,
  },
  {
    date: "2023-03-17",
    value: 332,
  },
  {
    date: "2023-03-18",
    value: 329,
  },
  {
    date: "2023-03-19",
    value: 330,
  },
  {
    date: "2023-03-20",
    value: 331,
  },
  {
    date: "2023-03-21",
    value: 334,
  },
  {
    date: "2023-03-22",
    value: 329,
  },
  {
    date: "2023-03-23",
    value: 332,
  },
  {
    date: "2023-03-24",
    value: 328,
  },
  {
    date: "2023-03-25",
    value: 331,
  },
  {
    date: "2023-03-26",
    value: 327,
  },
  {
    date: "2023-03-27",
    value: 331,
  },
  {
    date: "2023-03-28",
    value: 329,
  },
  {
    date: "2023-03-29",
    value: 327,
  },
  {
    date: "2023-03-30",
    value: 325,
  },
  {
    date: "2023-03-31",
    value: 328,
  },
];

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const data = {
  datasets: [
    {
      fill: true,
      data: charactergraph.map((e) => {
        const date = `${e.date.substring(2, 4)}.${e.date.substring(5, 7)}.${e.date.substring(
          8,
          10
        )}`;
        return { x: date, y: e.value };
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

export default function Character() {
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
