import {
  OverViewsChartBox,
  OverviewsEventPerAgeChart,
  OverviewsEventPerProvinceChart,
  OverviewsEventPerTimeChart,
  OverviewsEventPerMonthChart,
} from "./components";

function OverviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      {/* Container wrapper for consistent width */}
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
                    <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Injury Surveillance Dashboard
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Comprehensive analysis of injury events across Thailand in 2024. 
              This dashboard provides real-time insights into injury patterns, trends, 
              and geographic distribution to support evidence-based public health decisions 
              and injury prevention strategies.
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Executive Summary
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
                        <div className="bg-white rounded-lg p-2 sm:p-4 border border-blue-100">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">305,365</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Injury Events</div>
              <div className="text-xs text-gray-500 mt-1">12% increase from 2023</div>
            </div>
            <div className="bg-white rounded-lg p-2 sm:p-4 border border-green-100">
              <div className="text-lg sm:text-2xl font-bold text-green-600">77</div>
              <div className="text-xs sm:text-sm text-gray-600">Provinces Covered</div>
              <div className="text-xs text-gray-500 mt-1">100% coverage</div>
            </div>
            <div className="bg-white rounded-lg p-2 sm:p-4 border border-purple-100">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">17:00</div>
              <div className="text-xs sm:text-sm text-gray-600">Peak Hour</div>
              <div className="text-xs text-gray-500 mt-1">Evening rush hour</div>
            </div>
            <div className="bg-white rounded-lg p-2 sm:p-4 border border-orange-100">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">16 years</div>
              <div className="text-xs sm:text-sm text-gray-600">Most Affected Age</div>
              <div className="text-xs text-gray-500 mt-1">Teen population</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Key Findings:</strong> Analysis reveals significant seasonal
            variations with December showing the highest injury rates (30,009
            events). Traffic-related incidents peak during evening hours
            (16:00-18:00), particularly affecting teenagers aged 15-19. Northern
            provinces (Khon Kaen, Chiang Rai, Chiang Mai) require immediate
            attention due to elevated injury rates.
          </p>
        </div>

        {/* Top Row - Time Analysis - EQUAL HEIGHTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          <OverViewsChartBox
            header="Monthly Trends Analysis"
            description="Seasonal injury patterns throughout the year"
            headerClassName="text-gray-800"
          >
            <div className="w-full">
              <OverviewsEventPerMonthChart />
            </div>
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">Trend Insights</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • <strong>Peak Season:</strong> December shows highest injury
                  rates (30,009 events)
                </li>
                <li>
                  • <strong>Low Season:</strong> September records lowest
                  incidents (23,002 events)
                </li>
                <li className="hidden sm:block">
                  • <strong>Holiday Effect:</strong> Year-end festivities
                  correlate with increased injuries
                </li>
                <li className="hidden sm:block">
                  • <strong>Weather Impact:</strong> Rainy season (Jul-Sep)
                  shows reduced road accidents
                </li>
              </ul>
            </div>
          </OverViewsChartBox>

          <OverViewsChartBox
            header="Daily Pattern Analysis"
            description="Peak hours for injury events"
            headerClassName="text-gray-800"
          >
            <div className="w-full">
              <OverviewsEventPerTimeChart />
            </div>
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-purple-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">Time Insights</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • <strong>Peak Hours:</strong> 17:00 (24,731 events) - Evening
                  rush hour
                </li>
                <li>
                  • <strong>Secondary Peak:</strong> 16:00 (20,816 events) -
                  School dismissal time
                </li>
                <li className="hidden sm:block">
                  • <strong>Safest Time:</strong> 04:00-05:00 - Minimal traffic
                  activity
                </li>
                <li className="hidden sm:block">
                  • <strong>Morning Rise:</strong> Sharp increase from 06:00
                  onwards
                </li>
              </ul>
            </div>
          </OverViewsChartBox>
        </div>

        {/* Age Analysis */}
        <OverViewsChartBox
          header="Age Distribution Analysis"
          description="Injury events across different age groups"
          headerClassName="text-gray-800"
        >
          <div className="w-full">
            <OverviewsEventPerAgeChart />
          </div>
          <div className="mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                High-Risk Demographics
              </h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                <li>
                  • <strong>Teenagers (15-19):</strong> Highest vulnerability
                  group
                </li>
                <li>
                  • <strong>Young Adults (20-29):</strong> Significant workplace
                  injuries
                </li>
                <li>
                  • <strong>Children (5-14):</strong> School and playground
                  related incidents
                </li>
                <li>
                  • <strong>Elderly (70+):</strong> Fall-related injuries
                  increasing
                </li>
              </ul>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                Prevention Strategies
              </h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                <li>• Enhanced road safety education for teens</li>
                <li>• Workplace safety protocols for young adults</li>
                <li>• School safety infrastructure improvements</li>
                <li>• Elderly fall prevention programs</li>
              </ul>
            </div>
          </div>
        </OverViewsChartBox>

        {/* Provincial Analysis */}
        <OverViewsChartBox
          header="Provincial Distribution Analysis"
          description="Geographic distribution of injury events"
          headerClassName="text-gray-800"
        >
          <div className="w-full">
            <OverviewsEventPerProvinceChart />
          </div>
          <div className="mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-red-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">Critical Areas</h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>
                  • <strong>Khon Kaen:</strong> 20,851 events
                </li>
                <li>
                  • <strong>Chiang Rai:</strong> 20,006 events
                </li>
                <li>
                  • <strong>Chiang Mai:</strong> 19,174 events
                </li>
                <li className="text-xs text-red-600 mt-2">
                  <strong>Action Required:</strong> Immediate intervention
                  needed
                </li>
              </ul>
            </div>
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                Contributing Factors
              </h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>• High population density</li>
                <li>• Major transportation hubs</li>
                <li>• Industrial activities</li>
                <li>• Tourist destinations</li>
              </ul>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                Recommendations
              </h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>• Strengthen emergency response</li>
                <li>• Improve road infrastructure</li>
                <li>• Enhanced safety regulations</li>
                <li>• Community awareness programs</li>
              </ul>
            </div>
          </div>
        </OverViewsChartBox>

        {/* Action Plan */}
        <div className="bg-gray-900 text-white rounded-lg p-3 sm:p-4 lg:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
            Strategic Action Plan 2024-2025
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div>
              <h3 className="text-sm sm:text-base font-medium text-yellow-400 mb-2">
                Immediate Actions (0-3 months)
              </h3>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>
                  • Deploy additional emergency services in high-risk provinces
                </li>
                <li>• Launch teen road safety campaign</li>
                <li>• Implement evening hour traffic controls</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium text-blue-400 mb-2">
                Short-term Goals (3-12 months)
              </h3>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Establish injury prevention centers</li>
                <li>• Upgrade trauma care facilities</li>
                <li>• Develop predictive analytics system</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium text-green-400 mb-2">
                Long-term Vision (1-3 years)
              </h3>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Achieve 25% reduction in injury rates</li>
                <li>• Establish national injury registry</li>
                <li>• Create evidence-based policy framework</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-3 sm:pt-4">
          <p>
            Data Source: Ministry of Public Health, Thailand | Last Updated:
            January 2025 | Report Period: January - December 2024
          </p>
          <p className="mt-1 hidden sm:block">
            For technical questions, contact: surveillance@moph.go.th |
            Emergency: 1669
          </p>
          <p className="mt-1 sm:hidden">
            Contact: surveillance@moph.go.th | Emergency: 1669
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverviewsPage;
