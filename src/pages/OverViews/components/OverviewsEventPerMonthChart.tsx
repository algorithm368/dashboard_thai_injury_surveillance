import { useEffect, useState } from "react";
import LineChartComponent from "../../../components/charts/LineChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";
import { formatMonth } from "../../../utils/dateUtils";

type DataPoint = {
  month: string;
  count: number;
  percentage: number;
};

const parseRow = (row: unknown): DataPoint => {
  if (
    typeof row === "object" &&
    row !== null &&
    "month" in row &&
    "count" in row
  ) {
    return {
      month: formatMonth((row as unknown).month),
      count: Number((row as unknown).count),
      percentage: Number((row as unknown).percentage),
    };
  }
  throw new Error("Invalid data format");
};

function OverviewsEventPerMonthChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetchCsvData<DataPoint>("/data/2024_month_event_counts.csv", parseRow)
      .then(setChartData)
      .catch((error) => {
        console.error("Failed to load chart data:", error);
      });
  }, []);

  return (
    <LineChartComponent
      data={chartData}
      lines={[
        {
          dataKey: "count",
          stroke: "#3B82F6", // Modern blue
          name: "Event Count",
          strokeWidth: 3,
          dot: {
            fill: "#3B82F6",
            strokeWidth: 2,
            r: 6,
            stroke: "#ffffff",
          },
          activeDot: {
            r: 8,
            fill: "#1D4ED8",
            stroke: "#ffffff",
            strokeWidth: 3,
            filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))",
          },
        },
      ]}
      xAxisKey="month"
      height={400}
      title=""
      tooltip={{
        enabled: true,
        formatter: (value, name) => [`${value.toLocaleString()} events`, name],
        contentStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      }}
      legend={{ enabled: false }}
      grid={{
        enabled: true,
        strokeDasharray: "3 3",
        stroke: "#E5E7EB",
        opacity: 0.6,
      }}
      theme="light"
    />
  );
}

export default OverviewsEventPerMonthChart;
