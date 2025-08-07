import { useEffect, useState, useMemo } from "react";
import LineChartComponent from "../../../components/charts/LineChartComponents";
import BarChartComponents from "../../../components/charts/BarChartComponents";
import { fetchCsvData } from "../../../utils/fetchCsvData";

type DataPoint = {
  age: number;
  count: number;
};

type AgeGroupData = {
  ageGroup: string;
  count: number;
  range: string;
};

const parseRow = (row: unknown): DataPoint => {
  if (
    typeof row === "object" &&
    row !== null &&
    "age" in row &&
    "count" in row
  ) {
    return {
      age: Number((row as unknown).age),
      count: Number((row as unknown).count),
    };
  }
  throw new Error("Invalid data format");
};

// Function to group ages into meaningful categories
const groupAgeData = (data: DataPoint[]): AgeGroupData[] => {
  const ageGroups = {
    "0-4": { min: 0, max: 4, count: 0 },
    "5-9": { min: 5, max: 9, count: 0 },
    "10-14": { min: 10, max: 14, count: 0 },
    "15-19": { min: 15, max: 19, count: 0 },
    "20-29": { min: 20, max: 29, count: 0 },
    "30-39": { min: 30, max: 39, count: 0 },
    "40-49": { min: 40, max: 49, count: 0 },
    "50-59": { min: 50, max: 59, count: 0 },
    "60-69": { min: 60, max: 69, count: 0 },
    "70-79": { min: 70, max: 79, count: 0 },
    "80+": { min: 80, max: 200, count: 0 },
  };

  data.forEach((item) => {
    for (const [, group] of Object.entries(ageGroups)) {
      if (item.age >= group.min && item.age <= group.max) {
        group.count += item.count;
        break;
      }
    }
  });

  return Object.entries(ageGroups).map(([groupName, group]) => ({
    ageGroup: groupName,
    count: group.count,
    range:
      groupName === "80+" ? "80+ years" : `${group.min}-${group.max} years`,
  }));
};

function OverviewsEventPerAgeChart() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [viewMode, setViewMode] = useState<"detailed" | "grouped">("grouped");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCsvData<DataPoint>("/data/2024_age_event_counts.csv", parseRow)
      .then((data) => {
        // Sort by age for better visualization
        const sortedData = data.toSorted((a, b) => a.age - b.age);
        setChartData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load chart data:", error);
        setLoading(false);
      });
  }, []);

  // Memoized data processing
  const processedData = useMemo(() => {
    if (viewMode === "grouped") {
      return groupAgeData(chartData);
    }
    // Filter out extreme outliers for better visualization
    return chartData.filter((item) => item.age <= 100);
  }, [chartData, viewMode]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (chartData.length === 0) return null;

    const totalEvents = chartData.reduce((sum, item) => sum + item.count, 0);
    const peakAge = chartData.reduce(
      (max, item) => (item.count > max.count ? item : max),
      chartData[0]
    );

    // Calculate weighted average age
    const weightedSum = chartData.reduce(
      (sum, item) => sum + item.age * item.count,
      0
    );
    const averageAge = weightedSum / totalEvents;

    return {
      totalEvents: totalEvents.toLocaleString(),
      peakAge: `${
        peakAge.age
      } years (${peakAge.count.toLocaleString()} events)`,
      averageAge: averageAge.toFixed(1),
    };
  }, [chartData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading age data...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Controls and Statistics */}
      <div className="mb-4 space-y-3">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <button
              onClick={() => setViewMode("grouped")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "grouped"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Age Groups
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "detailed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Detailed
            </button>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {stats.totalEvents}
              </div>
              <div className="text-xs text-gray-600">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {stats.peakAge}
              </div>
              <div className="text-xs text-gray-600">Peak Age</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {stats.averageAge} years
              </div>
              <div className="text-xs text-gray-600">Average Age</div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      {viewMode === "grouped" ? (
        <BarChartComponents
          data={processedData}
          bars={[
            {
              dataKey: "count",
              fill: "#8884d8",
              name: "Event Count",
            },
          ]}
          xAxisKey="ageGroup"
          height={400}
          tooltip={{
            formatter: (value, name) => [
              `${value.toLocaleString()} events`,
              name,
            ],
            labelFormatter: (label) => {
              const item = processedData.find((d) => d.ageGroup === label);
              return item ? `${label} (${item.range})` : label;
            },
          }}
          xAxis={{
            angle: -45,
            interval: 0,
          }}
          theme="light"
        />
      ) : (
        <LineChartComponent
          data={processedData}
          lines={[
            {
              dataKey: "count",
              stroke: "#8884d8",
              name: "Event Count",
              strokeWidth: 2,
              dot: { r: 3 },
            },
          ]}
          xAxisKey="age"
          height={400}
          title=""
          tooltip={{
            formatter: (value, name) => [
              `${value.toLocaleString()} events`,
              name,
            ],
            labelFormatter: (age) => `Age: ${age} years`,
          }}
          xAxis={{
            tickFormatter: (value) => `${value}y`,
          }}
          yAxis={{
            tickFormatter: (value) => value.toLocaleString(),
          }}
          theme="light"
          brush={{ enabled: true, height: 40 }}
        />
      )}
    </div>
  );
}

export default OverviewsEventPerAgeChart;
