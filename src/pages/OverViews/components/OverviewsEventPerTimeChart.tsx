import { useEffect, useState } from "react";
import LineChartComponent from "../../../components/charts/LineChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";

type DataPoint = {
  time: number;
  count: number;
};

const parseRow = (row: unknown): DataPoint => {
  if (
    typeof row === "object" &&
    row !== null &&
    "hour" in row &&
    "count" in row
  ) {
    return {
      hour: Number((row as unknown).hour),
      count: Number((row as unknown).count),
    };
  }

  throw new Error("Invalid data format");
};

function OverviewsEventPerTimeChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    fetchCsvData<DataPoint>("/data/2024_time_event_counts.csv", parseRow)
      .then(setChartData)
      .catch((error) => {
        console.error("Failed to load chart data:", error);
      });
  }, []);

  return (
    <LineChartComponent
      data={chartData}
      lines={[{ dataKey: "count", stroke: "#8884d8", name: "Count" }]}
      xAxisKey="hour"
    />
  );
}

export default OverviewsEventPerTimeChart;
