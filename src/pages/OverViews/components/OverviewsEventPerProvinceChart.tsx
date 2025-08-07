import { useEffect, useState } from "react";
import BarChartComponents from "../../../components/charts/BarChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";

type DataPoint = {
  province: string;
  count: number;
};

const parseRow = (row: unknown): DataPoint => {
  if (
    typeof row === "object" &&
    row !== null &&
    "prov" in row &&
    "count" in row
  ) {
    return {
      province: String((row as unknown).prov),
      count: Number((row as unknown).count),
    };
  }
  throw new Error("Invalid data format");
};

function OverviewsEventPerProvinceChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetchCsvData<DataPoint>("/data/2024_province_event_counts.csv", parseRow)
      .then(setChartData)
      .catch((error) => {
        console.error("Failed to load chart data:", error);
      });
  }, []);

  return (
    <BarChartComponents
      data={chartData}
      bars={[
        {
          dataKey: "count",
          fill: "#10B981", // Modern green
          name: "Event Count",
          radius: [4, 4, 0, 0],
          stroke: "#10B981",
          strokeWidth: 1,
        },
      ]}
      xAxisKey="province"
      height={400}
      top={10}
      tooltip={{
        formatter: (value, name) => [`${value.toLocaleString()} events`, name],
        contentStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      }}
      xAxis={{
        angle: -45,
        interval: 0,
        tick: { fontSize: 11, fill: "#6B7280" },
        tickFormatter: (value) =>
          value.length > 8 ? `${value.slice(0, 8)}...` : value,
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
      theme="light"
      loading={chartData.length === 0}
      // Add custom gradient definition
      style={{
        background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
      }}
    />
  );
}

export default OverviewsEventPerProvinceChart;
