import { useContext } from "react";
import { Chart } from "eds-react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";

export const CostlyEvents: React.FC = () => {
  const { topCostlyEventsData, isGetTopCostlyEventsLoading } =
    useContext(DashboardContext);

  return (
    <>
      {isGetTopCostlyEventsLoading && <LoadingItem />}
      {topCostlyEventsData && (
        <Chart
          type="doughnut"
          width="100%"
          show={true}
          labels={topCostlyEventsData?.events.map(
            (event) => event.notificationEvent,
          )}
          series={topCostlyEventsData?.events.map((event) => event.usage)}
        />
      )}
    </>
  );
};
