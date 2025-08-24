import { useTranslation } from "react-i18next";
import { AvgChannelUsage } from "./Charts/AvgChannelUsage";
import { ChannelUsage } from "./Charts/ChannelUsage";
import { CostlyEvents } from "./Charts/CostlyEvents";
import { MonthlyBilling } from "./Charts/MonthlyBilling";
import { NotificationCountArc } from "./Charts/NotificationCountArc";
import { CardCustom } from "./ui/CardCustom";

export function DashboardCharts() {
  const { t } = useTranslation();
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardCustom title={t("dashboard.channel_usage_analytics").toString()}>
          <ChannelUsage />
        </CardCustom>
        <CardCustom title={t("dashboard.average_channel_usage").toString()}>
          <AvgChannelUsage />
        </CardCustom>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CardCustom title={t("dashboard.top_costly_events").toString()}>
          <CostlyEvents />
        </CardCustom>
        <CardCustom title={t("dashboard.total_notification_sent").toString()}>
          <NotificationCountArc />
        </CardCustom>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <CardCustom title={t("dashboard.monthly_billing").toString()}>
          <MonthlyBilling />
        </CardCustom>
      </div>
    </div>
  );
}
