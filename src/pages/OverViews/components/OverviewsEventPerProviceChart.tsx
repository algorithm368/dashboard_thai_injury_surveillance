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
      province: String((row as any).prov),
      count: Number((row as any).count),
    };
  }

  throw new Error("Invalid data format");
};

function OverviewsEventPerProviceChart() {
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
          fill: "#8884d8",
          name: "Event Count",
        },
      ]}
      xAxisKey="province"
      height={400}
      top={10}
    />
  );
}

export default OverviewsEventPerProviceChart;