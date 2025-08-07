import {
  BarChart,
  Bar,
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
}: Readonly<BarChartComponentProps>) {
  const chartData = top
    ? data.toSorted((a, b) => Number(b.count) - Number(a.count)).slice(0, top)
    : data;
  return (
    <div className="bar-chart-container" style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill}
              name={bar.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponents;
