import { useEffect, useState } from "react";
import BarChartComponents from "../../../components/charts/BarChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";

type DataPoint = {
  province: string;
  count: number;
};

const parseRow = (row: unknown): DataPoint => {
  const r = row as { prov?: unknown; count?: unknown };
  if (
    typeof row === "object" &&
    row !== null &&
    "prov" in r &&
    "count" in r
  ) {
    return {
      province: String(r.prov),
      count: Number(r.count),
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

function OverviewsEventPerProvinceChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const chartHeight = useResponsiveHeight();

  useEffect(() => {
    fetchCsvData<DataPoint>("/projects/dashboard/injury/2024/data/2024_province_event_counts.csv", parseRow)
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
        },
      ]}
      xAxisKey="province"
      xAxisLabel="Province"
      yAxisLabel="Number of Events"
      height={chartHeight}
      top={10}
      theme="light"
    />
  );
}

export default OverviewsEventPerProvinceChart;
