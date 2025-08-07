import { useEffect, useState } from "react";
import LineChartComponent from "../../../components/charts/LineChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";

type DataPoint = {
  hour: number;
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
      hour: Number((row as any).hour),
      count: Number((row as any).count),
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
      lines={[
        {
          dataKey: "count",
          stroke: "#8B5CF6", // Purple
          name: "Hourly Events",
          strokeWidth: 3,
          dot: {
            fill: "#8B5CF6",
            strokeWidth: 2,
            r: 4,
            stroke: "#ffffff",
          },
          activeDot: {
            r: 7,
            fill: "#7C3AED",
            stroke: "#ffffff",
            strokeWidth: 2,
            filter: "drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))",
          },
        },
      ]}
      xAxisKey="hour"
      height={400}
      tooltip={{
        enabled: true,
        formatter: (value, name) => [`${value.toLocaleString()} events`, name],
        labelFormatter: (hour) => `${hour}:00`,
        contentStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      }}
      xAxis={{
        tickFormatter: (value) => `${value}:00`,
        tick: { fontSize: 11, fill: "#6B7280" },
      }}
      yAxis={{
        tick: { fontSize: 11, fill: "#6B7280" },
      }}
      grid={{
        enabled: true,
        strokeDasharray: "3 3",
        stroke: "#E5E7EB",
        opacity: 0.6,
      }}
      // Add reference lines for business hours
      referenceLines={[
        {
          value: 8,
          stroke: "#F59E0B",
          strokeDasharray: "5 5",
          label: "Work Start",
        },
        {
          value: 17,
          stroke: "#EF4444",
          strokeDasharray: "5 5",
          label: "Peak Hour",
        },
      ]}
      theme="light"
    />
  );
}

export default OverviewsEventPerTimeChart;
