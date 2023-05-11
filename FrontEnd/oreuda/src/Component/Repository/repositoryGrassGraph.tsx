import "hammerjs";

import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartXAxis,
  ChartXAxisItem,
  ChartYAxis,
  ChartYAxisItem,
} from "@progress/kendo-react-charts";

const dayLabels: { [index: number]: string } = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

const data = [
  [1, 0, 0],
  [1, 1, 4],
  [1, 2, 7],
  [1, 3, 14],
  //   [1, 4, 10],
  //   [1, 5, 8],
  //   [1, 6, 0],
  [2, 0, 0],
  [2, 1, 6],
  [2, 2, 9],
  //   [2, 3, 12],
  //   [2, 4, 12],
  //   [2, 5, 6],
  //   [2, 6, 0],
  //   [3, 0, 0],
  //   [3, 1, 5],
  [3, 2, 8],
  [3, 3, 11],
  [3, 4, 0],
  [3, 5, 5],
  [3, 6, 0],
  [4, 0, 0],
  [4, 1, 0],
  [4, 2, 0],
  [4, 3, 0],
  [4, 4, 0],
  [4, 5, 0],
  [4, 6, 0],
  [5, 0, 0],
  [5, 1, 0],
  [5, 2, 0],
  [5, 3, 0],
  [5, 4, 0],
  [5, 5, 0],
  [5, 6, 0],
  [6, 0, 0],
  [6, 1, 4],
  [6, 2, 7],
  [6, 3, 14],
  [6, 4, 10],
  [6, 5, 8],
  [6, 6, 0],
  [7, 0, 0],
  [7, 1, 6],
  [7, 2, 9],
  [7, 3, 2],
  [7, 4, 4],
  [7, 5, 6],
  [7, 6, 0],
  [8, 0, 0],
  [8, 1, 4],
  [8, 2, 7],
  [8, 3, 14],
  [8, 4, 10],
  [8, 5, 8],
  [8, 6, 0],
  [9, 0, 0],
  [9, 1, 4],
  [9, 2, 7],
  [9, 3, 4],
  [9, 4, 1],
  [9, 5, 8],
  [9, 6, 0],
  [10, 0, 0],
  [10, 1, 6],
  [10, 2, 9],
  [10, 3, 12],
  [10, 4, 12],
  [10, 5, 6],
  [10, 6, 0],
  [11, 0, 0],
  [11, 1, 4],
  [11, 2, 7],
  [11, 3, 10],
  [11, 4, 10],
  [11, 5, 8],
  [11, 6, 0],
  [12, 0, 0],
  [12, 1, 4],
  [12, 2, 7],
  [12, 3, 8],
  [12, 4, 10],
  [12, 5, 4],
  [12, 6, 0],
  [13, 0, 0],
  [13, 1, 4],
  [13, 2, 7],
  [13, 3, 11],
  [13, 4, 0],
  [13, 5, 8],
  [13, 6, 0],
  [14, 0, 0],
  [14, 1, 6],
  [14, 2, 9],
  [14, 3, 6],
  [14, 4, 8],
  [14, 5, 6],
  [14, 6, 0],
  [15, 0, 0],
  [15, 1, 4],
  [15, 2, 7],
  [15, 3, 7],
  [15, 4, 10],
  [15, 5, 8],
  [15, 6, 0],
];

const yAxisLabelContent = (e: any) => dayLabels[e.value] || "";

export default function RepositoryGrassGraph() {
  return (
    <Chart style={{ width: "400px", height: "220px" }}>
      <ChartTitle text="Contributions per day" margin={{ left: 40 }} />

      <ChartSeries>
        <ChartSeriesItem
          type="heatmap"
          data={data}
          color="#216e39"
          labels={{ visible: false }}
          markers={{ type: "roundedRect", border: { width: 2 } }}
        />
      </ChartSeries>

      <ChartXAxis>
        <ChartXAxisItem visible={false} />
      </ChartXAxis>

      <ChartYAxis>
        <ChartYAxisItem
          reverse={true}
          line={{ visible: false }}
          labels={{ content: yAxisLabelContent }}
        />
      </ChartYAxis>
    </Chart>
  );
}
