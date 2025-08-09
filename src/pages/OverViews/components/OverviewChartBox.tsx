import { ReactNode, CSSProperties } from "react";

type OverViewsChartBoxProps = Readonly<{
  children: ReactNode;
  header?: string;
  description?: string;
  headerClassName?: string;
  descriptionClassName?: string;
  style?: CSSProperties;
}>;

function OverViewsChartBox({
  children,
  header,
  description,
  headerClassName = "",
  descriptionClassName = "",
  style = {},
}: OverViewsChartBoxProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 w-full h-auto"
      style={style}
    >
      {/* Header Section - Responsive */}
      {header && (
        <div className="mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          <h3
            className={`text-base sm:text-lg font-semibold text-gray-800 ${headerClassName}`}
          >
            {header}
          </h3>
          {description && (
            <p
              className={`text-xs sm:text-sm text-gray-600 mt-1 ${descriptionClassName}`}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Chart Content - Responsive Container */}
      <div className="chart-content w-full overflow-hidden">{children}</div>
    </div>
  );
}

export default OverViewsChartBox;
