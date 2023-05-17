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
import Cookies from "js-cookie";
import { Line } from "react-chartjs-2";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import st from "./charactergraph.module.scss";

import { GetUserRefresh } from "@/Api/Oauth/getUserRefresh";
import { GetCharacterGraph } from "@/Api/Plant/getCharacterGraph";
import { saveCookies } from "@/Api/Oauth/saveCookies";

export interface Charactergraph {
  id: number;
  time: string;
  val: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

export default function Character() {
  const ACCESS_TOKEN = Cookies.get("Authorization");
  const REFRESH_TOKEN = Cookies.get("RefreshToken");
  const [characterGraph, setCharacterGraph] = useState<Charactergraph[]>([]);

  const loadCharacterGraphData = useCallback(async () => {
    try {
      const res = await GetCharacterGraph(ACCESS_TOKEN);
      setCharacterGraph(res.data);
    } catch (err: any) {
      if (err.response?.status == 401) {
        const token = await GetUserRefresh(ACCESS_TOKEN, REFRESH_TOKEN);
        saveCookies(token.data.Authorization, token.data.RefreshToken);
        try {
          const res = await GetCharacterGraph(token.data.Authorization);
          setCharacterGraph(res.data);
        } catch (error) {
          redirect("/landing");
        }
      } else {
        redirect("/landing");
      }
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  useEffect(() => {
    loadCharacterGraphData();
  }, [loadCharacterGraphData]);

  const data = {
    datasets: [
      {
        fill: true,
        data: characterGraph?.map((e: Charactergraph) => {
          const date = `${e.time.substring(2, 4)}.${e.time.substring(
            5,
            7
          )}.${e.time.substring(8, 10)}`;
          return { x: date, y: e.val };
        }),
      },
    ],
  };

  const options = {
    responsive: false,
    borderColor: "rgba(255,145,165,0.6)",
    backgroundColor: "rgba(255,145,165,0.4)",
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
      <ul className={st.discription}>날짜별 캐릭터 능력치 변화추이입니다</ul>
      <Line options={options} data={data} width={600} height={320} />
    </div>
  );
}
