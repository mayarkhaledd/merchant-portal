import { Chart } from "eds-react";
import { useContext } from "react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const NotificationCountArc: React.FC = () => {
  const { totalNotificationSentData, isGetTotalNotificationSentLoading } =
    useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetTotalNotificationSentLoading && <LoadingItem />}
      {totalNotificationSentData && (
        <Chart
          type="arc"
          width="100%"
          labels={[t("dashboard.total_notification_sent")]}
          series={[totalNotificationSentData.total]}
        />
      )}
    </>
  );
};
