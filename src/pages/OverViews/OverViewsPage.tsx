import {
  OverViewsChartBox,
  OverviewsEventPerAgeChart,
  OverviewsEventPerProvinceChart,
  OverviewsEventPerTimeChart,
  OverviewsEventPerMonthChart,
} from "./components";

function OverviewsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Injury Surveillance Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of injury events across Thailand in 2024.
            Monitor trends, patterns, and high-risk areas to support public
            health decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OverViewsChartBox
            header="Monthly Event Trends"
            description="Track seasonal patterns and identify peak periods"
            headerClassName="text-blue-700"
            style={{ minHeight: "500px" }} // Fixed height
          >
            <div style={{ height: "400px" }}>
              <OverviewsEventPerMonthChart />
            </div>
          </OverViewsChartBox>

          <OverViewsChartBox
            header="Time of Day Analysis"
            description="Identify peak hours for injury events"
            headerClassName="text-green-700"
            style={{ minHeight: "500px" }}
          >
            <div style={{ height: "400px" }}>
              <OverviewsEventPerTimeChart />
            </div>
          </OverViewsChartBox>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <OverViewsChartBox
            header="Event Distribution by Age"
            description="Analyze injury events across different age groups"
            headerClassName="text-purple-700"
          >
            <div style={{ height: "500px" }}>
              <OverviewsEventPerAgeChart />
            </div>
          </OverViewsChartBox>
        </div>
      </div>
    </div>
  );
}

export default OverviewsPage;
