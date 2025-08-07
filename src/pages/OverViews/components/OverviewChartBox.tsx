import { ReactNode, CSSProperties } from "react";

type OverViewsChartBoxProps = {
  children: ReactNode;
  header?: string;
  description?: string;
  headerClassName?: string;
  descriptionClassName?: string;
  style?: CSSProperties;
  equalHeight?: boolean; // New prop for equal heights
};

function OverViewsChartBox({
  children,
  header,
  description,
  headerClassName = "",
  descriptionClassName = "",
  style = {},
  equalHeight = false,
}: OverViewsChartBoxProps) {
  const baseStyle: CSSProperties = {
    ...style,
    ...(equalHeight && {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }),
  };

  return (
    <div
      className="p-4 m-4 border rounded-lg shadow-md bg-white"
      style={baseStyle}
    >
      {/* Header Section */}
      {header && (
        <div className="mb-3 border-b border-gray-200 pb-2 flex-shrink-0">
          <h3
            className={`text-lg font-semibold text-gray-800 ${headerClassName}`}
          >
            {header}
          </h3>
          {description && (
            <p className={`text-sm text-gray-600 mt-1 ${descriptionClassName}`}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Chart Content */}
      <div
        className="chart-content"
        style={
          equalHeight
            ? { flex: 1, display: "flex", flexDirection: "column" }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}

export default OverViewsChartBox;
