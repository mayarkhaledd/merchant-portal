import { Chart } from "eds-react";
import { useContext } from "react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const AvgChannelUsage: React.FC = () => {
  const { avgChannelUsageData, isGetAvgChannelUsageLoading } =
    useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetAvgChannelUsageLoading && <LoadingItem />}
      {avgChannelUsageData && (
        <Chart
          type="curvedLine"
          width="100%"
          categories={avgChannelUsageData?.channels.map(
            (channel) => channel.channel,
          )}
          series={[
            {
              name: t("dashboard.average_channel_usage"),
              data: avgChannelUsageData?.channels.map(
                (channel) => channel.usage,
              ),
            },
          ]}
        />
      )}
    </>
  );
};
