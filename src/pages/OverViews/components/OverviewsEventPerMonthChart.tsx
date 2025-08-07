import { useEffect, useState } from "react";
import LineChartComponent from "../../../components/charts/LineChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";
import { formatMonth } from "../../../utils/dateUtils";

/**
 * Every row of our chart has a month, a count (how many things),
 * and a percentage (how much compared to others).
 */
type DataPoint = {
  month: string;
  count: number;
  percentage: number;
};

/**
 * This function is like a teacher that looks at messy data
 * and turns it into something clean and smart, like:
 * - Changing "2024-01" to "2024"
 * @param row example: { month: "2024-01", count: "100", percentage: "10" }
 * @returns example: { month: "2024", count: 100, percentage: 10 }
 */
const parseRow = (row: unknown): DataPoint => {
  if (
    typeof row === "object" &&
    row !== null &&
    "month" in row &&
    "count" in row &&
    "percentage" in row
  ) {
    return {
      month: formatMonth((row as unknown).month),
      count: Number((row as unknown).count),
      percentage: Number((row as unknown).percentage),
    };
  }

  throw new Error("Invalid data format");
};

/**
 * This is the main component for the overview line chart.
 * @returns JSX.Element
 */
function OverviewsEventPerMonthChart() {
  /**
   * We create a box called `chartData` to hold our data.
   */
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  /**
   * When the page opens, We tell the computer:
   * - Hey! Go to this file on the internet, read the csv table,
   * - use our `parseRow' teacher to understand it, and then save it into our chartbox!
   * If it fails, we just print an error in the console.
   */
  useEffect(() => {
    fetchCsvData<DataPoint>("/data/2024_month_event_counts.csv", parseRow)
      .then(setChartData)
      .catch((error) => {
        console.error("Failed to load chart data:", error);
      });
  }, []);

  /**
   * Finally we draw a `line chart` using clean-up data!
   * - The x-axis shows the month,
   * - The y-axis shows the count of things,
   */
  return (
    <LineChartComponent
      data={chartData}
      lines={[{ dataKey: "count", stroke: "#8884d8", name: "Count" }]}
      xAxisKey="month"
    />
  );
};

export default OverviewsEventPerMonthChart;
