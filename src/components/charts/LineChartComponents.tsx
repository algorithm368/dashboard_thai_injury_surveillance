import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  [key: string]: string | number;
};

type LineConfig = {
  dataKey: string;
  stroke: string;
  name?: string;
  strokeWidth?: number;
  dot?: object;
  activeDot?: object;
};

type TooltipConfig = {
  enabled: boolean;
  formatter?: (value: number | string, name: string) => [string, string];
  contentStyle?: object;
};

type LegendConfig = {
  enabled: boolean;
};

type GridConfig = {
  enabled: boolean;
  strokeDasharray?: string;
  stroke?: string;
  opacity?: number;
};

type LineChartComponentProps = {
  data: DataPoint[];
  lines: LineConfig[];
  xAxisKey: string;
  height?: number;
  title?: string;
  tooltip?: TooltipConfig;
  legend?: LegendConfig;
  grid?: GridConfig;
  theme?: "light" | "dark";
  xAxisLabel?: string;
  yAxisLabel?: string;
};

/**
 * Reusable LineChartComponent for displaying multiple lines.
 */
function LineChartComponent({
  data,
  lines,
  xAxisKey,
  height = 300,
  tooltip = { enabled: true },
  legend = { enabled: true },
  grid = { enabled: true },
  theme = "light",
  xAxisLabel,
  yAxisLabel,
}: Readonly<LineChartComponentProps>) {
  return (
    <div className="line-chart-container w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ top: 20, right: 20, left: 60, bottom: 80 }}
        >
          {grid.enabled && (
            <CartesianGrid 
              strokeDasharray={grid.strokeDasharray || "3 3"}
              stroke={grid.stroke}
              opacity={grid.opacity}
            />
          )}
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
          {tooltip.enabled && (
            <Tooltip 
              formatter={tooltip.formatter}
              contentStyle={tooltip.contentStyle}
            />
          )}
          {legend.enabled && <Legend />}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              strokeWidth={line.strokeWidth}
              dot={line.dot}
              activeDot={line.activeDot}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
