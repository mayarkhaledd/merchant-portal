import { useContext } from "react";
import { Chart } from "eds-react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const ChannelUsage: React.FC = () => {
  const { channelUsageData, isGetChannelUsageLoading } =
    useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetChannelUsageLoading && <LoadingItem />}
      {channelUsageData && (
        <Chart
          type="bar"
          width="100%"
          labels={channelUsageData?.channels.map((channel) => channel.channel)}
          series={[
            {
              name: t("dashboard.channel_usage"),
              data: channelUsageData?.channels.map((channel) => channel.usage),
            },
          ]}
        />
      )}
    </>
  );
};
