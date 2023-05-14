import { useRef } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import "./repositoryGrassGraph.css";
import { DailyCommit } from "@/Component/Repository/repository";


export default function RepositoryGrassGraph(props: {
  dailyCommits: DailyCommit[];
}) {
  const { dailyCommits } = props;
  const speechBubbleRef = useRef<HTMLParagraphElement>(null);
  const std = Math.max(...dailyCommits.map((v) => v.count)) / 4;

  const getScale = (value: number) => {
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
    <>
      <p className="arrow_box" ref={speechBubbleRef}></p>
      <CalendarHeatmap
        startDate={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}
        endDate={Date.now()}
        values={dailyCommits}
        classForValue={(value) => {
          if (!value) {
            return "color-commit-0";
          }
          return getScale(value.count);
        }}
        onMouseOver={(e, value) => {
          if (value) {
            speechBubbleRef.current!.innerText = `${value.date} : ${value.count} 커밋`;
            speechBubbleRef.current!.style.top = `${e.clientY + 10}px`;
            speechBubbleRef.current!.style.left = `${e.clientX - 85}px`;
            speechBubbleRef.current!.style.display = "block";
          }
        }}
        onMouseLeave={() => {
          speechBubbleRef.current!.style.display = "none";
        }}
      />
    </>
  );
}
