import OverviewsEventPerMonthChart from "../OverViews/components/OverviewsEventPerMonthChart";
import OverviewsEventPerProvinceChart from "../OverViews/components/OverviewsEventPerProvinceChart";
import OverviewsEventPerTimeChart from "../OverViews/components/OverviewsEventPerTimeChart";
import OverviewsEventPerAgeChart from "../OverViews/components/OverviewsEventPerAgeChart";
import OverViewsChartBox from "../OverViews/components/OverviewChartBox";

function TestPages() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Injury Surveillance Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of injury events across Thailand in 2024. 
            Monitor trends, patterns, and high-risk areas to support public health decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OverViewsChartBox
            header="📅 Monthly Event Trends"
            description="Track seasonal patterns and identify peak periods for injury events throughout the year"
            headerClassName="text-blue-700"
          >
            <OverviewsEventPerMonthChart />
          </OverViewsChartBox>

          <OverViewsChartBox
            header="🗺️ Provincial Distribution"
            description="Geographic hotspots - Top 10 provinces with highest injury rates for targeted interventions"
            headerClassName="text-green-700"
          >
            <OverviewsEventPerProvinceChart />
          </OverViewsChartBox>
        </div>

        {/* Middle Row - Time Analysis */}
        <div className="mb-8">
          <OverViewsChartBox
            header="🕐 Hourly Event Pattern"
            description="24-hour injury distribution analysis - Understand peak incident times to optimize emergency response and prevention strategies"
            headerClassName="text-purple-700"
          >
            <OverviewsEventPerTimeChart />
          </OverViewsChartBox>
        </div>

        {/* Bottom Row - Demographics */}
        <div className="mb-8">
          <OverViewsChartBox
            header="👥 Age Group Analysis"
            description="Demographic vulnerability assessment - Age distribution patterns to identify at-risk populations and tailor prevention programs"
            headerClassName="text-orange-700"
          >
            <OverviewsEventPerAgeChart />
          </OverViewsChartBox>
        </div>

        {/* Summary Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">305,365</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">🏥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Provinces</p>
                <p className="text-2xl font-bold text-gray-900">77</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">⏰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Peak Hour</p>
                <p className="text-2xl font-bold text-gray-900">17:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">🎯</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High Risk Age</p>
                <p className="text-2xl font-bold text-gray-900">16 years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Key Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">⚠️ Priority Areas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Khon Kaen, Chiang Rai, and Chiang Mai require immediate attention</li>
                <li>• Teen population (15-19 years) shows highest vulnerability</li>
                <li>• Evening hours (16:00-18:00) need enhanced safety measures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">📈 Trends</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• December shows peak injury events (seasonal factor)</li>
                <li>• Working hours correlation with injury patterns</li>
                <li>• Age groups 15-25 require targeted intervention programs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-6">
          <p>
            Data last updated: January 2025 | 
            Source: Thai Ministry of Public Health | 
            Dashboard v2.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestPages;