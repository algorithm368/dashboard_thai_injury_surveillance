import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type DataPoint = {
  [key: string]: string | number;
};

type BarConfig = {
  dataKey: string;
  fill: string;
  name?: string;
};

type BarChartComponentProps = {
  data: DataPoint[];
  bars: BarConfig[];
  xAxisKey: string;
  height?: number;
  top?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  onClick?: (data: DataPoint) => void;
  onMouseEnter?: (data: DataPoint) => void;
  onMouseLeave?: () => void;
  borderOnly?: boolean;
  theme?: "light" | "dark";
};

/**
 * Reusable BarChartComponent for displaying multiple bars.
 */
function BarChartComponents({
  data,
  bars,
  xAxisKey,
  height = 300,
  top,
  xAxisLabel,
  yAxisLabel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  borderOnly = false,
  theme = "light",
}: Readonly<BarChartComponentProps>) {
  const chartData = top
    ? data.toSorted((a, b) => Number(b.count) - Number(a.count)).slice(0, top)
    : data;

  return (
    <div className="bar-chart-container w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData}
          margin={{ top: 20, right: 20, left: 60, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: theme === "dark" ? "#ffffff" : "#374151" }}
            tickLine={{ stroke: theme === "dark" ? "#ffffff" : "#374151" }}
            axisLine={{ stroke: theme === "dark" ? "#ffffff" : "#374151" }}
            label={{ 
              value: xAxisLabel || "", 
              position: "insideBottomLeft", 
              offset: -5,
              style: { textAnchor: "middle", fontSize: "14px", fontWeight: "500" }
            }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: theme === "dark" ? "#ffffff" : "#374151" }}
            tickLine={{ stroke: theme === "dark" ? "#ffffff" : "#374151" }}
            axisLine={{ stroke: theme === "dark" ? "#ffffff" : "#374151" }}
            label={{ 
              value: yAxisLabel || "", 
              angle: -90, 
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: "14px", fontWeight: "500" }
            }}
          />
          <Tooltip />
          <Legend />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={borderOnly ? "transparent" : bar.fill}
              stroke={borderOnly ? bar.fill : "none"}
              strokeWidth={borderOnly ? 2 : 0}
              name={bar.name}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{ cursor: onClick ? "pointer" : "default" }}
            >
              {chartData.map((entry) => (
                <Cell 
                  key={`cell-${entry[xAxisKey]}`} 
                  fill={borderOnly ? "transparent" : bar.fill}
                  stroke={borderOnly ? bar.fill : "none"}
                  strokeWidth={borderOnly ? 2 : 0}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponents;
