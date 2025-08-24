import {
  DashboardPayload,
  ChannelUsageResponse,
  TotalNotificationSentResponse,
  CostlyNotificationEventResponse,
  MonthlyBillingResponse,
  BalanceResponse,
  BalanceOverviewPayload,
} from "@ejada/types/api/dashboardInterface";
import { API } from "@ejada/common";
import httpClient from "./httpClient";

export const DashboardService = {
  getChannelUsage: async (
    data: DashboardPayload,
  ): Promise<ChannelUsageResponse> => {
    const response = await httpClient.get(`${API.dashboard}/channels-usage`, {
      params: { ...data },
    });
    return {
      status: response.status,
      ...response.data,
    };
  },

  getAvgChannelUsage: async (
    data: DashboardPayload,
  ): Promise<ChannelUsageResponse> => {
    const response = await httpClient.get(
      `${API.dashboard}/avg-channels-usage`,
      {
        params: { ...data },
      },
    );
    return {
      status: response.status,
      ...response.data,
    };
  },

  getTotalNotificationSent: async (
    data: DashboardPayload,
  ): Promise<TotalNotificationSentResponse> => {
    const response = await httpClient.get(
      `${API.dashboard}/notification-count`,
      {
        params: { ...data },
      },
    );
    return {
      status: response.status,
      ...response.data,
    };
  },

  getTopCostlyEvents: async (
    data: DashboardPayload,
  ): Promise<CostlyNotificationEventResponse> => {
    const response = await httpClient.get(`${API.dashboard}/costly-events`, {
      params: { ...data },
    });
    return {
      status: response.status,
      ...response.data,
    };
  },

  getMonthlyBilling: async (
    data: DashboardPayload,
  ): Promise<MonthlyBillingResponse> => {
    const response = await httpClient.get(`${API.dashboard}/monthly-billing`, {
      params: { ...data },
    });
    return {
      status: response.status,
      ...response.data,
    };
  },

  getBalanceOverview: async (
    data: BalanceOverviewPayload,
  ): Promise<BalanceResponse> => {
    const response = await httpClient.get(`${API.dashboard}/balance-overview`, {
      params: { ...data },
    });
    return {
      status: response.status,
      ...response.data,
    };
  },
};
