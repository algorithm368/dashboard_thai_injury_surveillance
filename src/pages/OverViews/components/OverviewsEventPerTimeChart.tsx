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
      hour: Number((row as unknown).hour),
      count: Number((row as unknown).count),
    };
  }
  throw new Error("Invalid data format");
};

// Custom hook for responsive chart height
const useResponsiveHeight = () => {
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) {
        setHeight(250);
      } else if (window.innerWidth < 1024) {
        setHeight(320);
      } else {
        setHeight(400);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return height;
};

function OverviewsEventPerTimeChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const chartHeight = useResponsiveHeight();

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
          name: "Event Count",
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
      xAxisLabel="Hour of Day"
      yAxisLabel="Number of Events"
      height={chartHeight}
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

export default OverviewsEventPerTimeChart;
