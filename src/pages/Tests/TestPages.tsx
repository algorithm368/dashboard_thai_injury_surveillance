import OverviewsEventPerMonthChart from "../OverViews/components/OverviewsEventPerMonthChart";
import OverviewsEventPerProviceChart from "../OverViews/components/OverviewsEventPerProviceChart";
import OverviewsEventPerTimeChart from "../OverViews/components/OverviewsEventPerTimeChart";

function TestPages() {
  return (
    <>
    <br />
    <div className="p-4 m-4 border rounded-lg shadow-md">
      <OverviewsEventPerMonthChart />
    </div>
    <div className="p-4 m-4 border rounded-lg shadow-md">
      <OverviewsEventPerProviceChart />
    </div>
    <div className="p-4 m-4 border rounded-lg shadow-md">
      <OverviewsEventPerTimeChart />
    </div>
    </>
  );
}

export default TestPages;