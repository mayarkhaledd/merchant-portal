import { QueryConstant } from "@ejada/common";
import { useCustomQuery } from "../useCustomQuery";
import {
  BalanceInterface,
  BalanceOverviewPayload,
  BalanceResponse,
  ChannelUsageInterface,
  ChannelUsageResponse,
  CostlyNotificationEventInterface,
  CostlyNotificationEventResponse,
  DashboardPayload,
  MonthlyBillingInterface,
  MonthlyBillingResponse,
  TotalNotificationSentInterface,
  TotalNotificationSentResponse,
} from "@ejada/types/api/dashboardInterface";
import { DashboardService } from "@ejada/services/dashboard.service";
import {
  adaptGetBalanceOverview,
  adaptGetChannelUsage,
  adaptGetCostlyNotificationEvent,
  adaptGetMonthlyBilling,
  adaptGetTotalNotificationSent,
} from "../adaptors/dashboardAdaptor";

export const useGetChannelUsage = (
  data: DashboardPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    DashboardPayload,
    ChannelUsageResponse,
    ChannelUsageInterface
  >(
    QueryConstant.CHANNEL_USAGE,
    () => {
      return DashboardService.getChannelUsage(data);
    },
    (data: ChannelUsageResponse) => adaptGetChannelUsage(data),
    enabled,
  );
};

export const useGetAvgChannelUsage = (
  data: DashboardPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    DashboardPayload,
    ChannelUsageResponse,
    ChannelUsageInterface
  >(
    QueryConstant.AVG_CHANNEL_USAGE,
    () => {
      return DashboardService.getAvgChannelUsage(data);
    },
    (data: ChannelUsageResponse) => adaptGetChannelUsage(data),
    enabled,
  );
};

export const useGetTotalNotificationSent = (
  data: DashboardPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    DashboardPayload,
    TotalNotificationSentResponse,
    TotalNotificationSentInterface
  >(
    QueryConstant.TOTAL_NOTIFICATION_SENT,
    () => {
      return DashboardService.getTotalNotificationSent(data);
    },
    (data: TotalNotificationSentResponse) =>
      adaptGetTotalNotificationSent(data),
    enabled,
  );
};

export const useGetTopCostlyEvents = (
  data: DashboardPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    DashboardPayload,
    CostlyNotificationEventResponse,
    CostlyNotificationEventInterface
  >(
    QueryConstant.TOP_COSTLY_EVENTS,
    () => {
      return DashboardService.getTopCostlyEvents(data);
    },
    (data: CostlyNotificationEventResponse) =>
      adaptGetCostlyNotificationEvent(data),
    enabled,
  );
};

export const useGetMonthlyBilling = (
  data: DashboardPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    DashboardPayload,
    MonthlyBillingResponse,
    MonthlyBillingInterface
  >(
    QueryConstant.MONTHLY_BILLING,
    () => {
      return DashboardService.getMonthlyBilling(data);
    },
    (data: MonthlyBillingResponse) => adaptGetMonthlyBilling(data),
    enabled,
  );
};

export const useGetBalanceOverview = (
  data: BalanceOverviewPayload,
  enabled?: boolean,
) => {
  return useCustomQuery<
    BalanceOverviewPayload,
    BalanceResponse,
    BalanceInterface
  >(
    QueryConstant.BALANCE_OVERVIEW,
    () => {
      return DashboardService.getBalanceOverview(data);
    },
    (data: BalanceResponse) => adaptGetBalanceOverview(data),
    enabled,
  );
};
