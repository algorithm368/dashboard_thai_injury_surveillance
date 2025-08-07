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
};

type LineChartComponentProps = {
  data: DataPoint[];
  lines: LineConfig[];
  xAxisKey: string;
  height?: number;
};

/**
 * Reusable LineChartComponent for displaying multiple lines.
 */
function LineChartComponent({
  data,
  lines,
  xAxisKey,
  height = 300,
}: Readonly<LineChartComponentProps>) {
  return (
    <div className="line-chart-container" style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
