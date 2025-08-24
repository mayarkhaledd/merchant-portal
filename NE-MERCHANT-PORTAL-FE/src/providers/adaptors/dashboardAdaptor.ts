import {
  BalanceInterface,
  BalanceResponse,
  ChannelUsageInterface,
  ChannelUsageResponse,
  CostlyNotificationEventInterface,
  CostlyNotificationEventResponse,
  MonthlyBillingInterface,
  MonthlyBillingResponse,
  TotalNotificationSentInterface,
  TotalNotificationSentResponse,
} from "@ejada/types/api/dashboardInterface";

export function adaptGetChannelUsage(
  response: ChannelUsageResponse,
): ChannelUsageInterface {
  return {
    channels: response.data.channels.map((channel) => ({
      channel: channel.channel,
      usage: channel.usage,
    })),
  };
}

export function adaptGetTotalNotificationSent(
  response: TotalNotificationSentResponse,
): TotalNotificationSentInterface {
  return {
    total: response.data.total,
  };
}

export function adaptGetCostlyNotificationEvent(
  response: CostlyNotificationEventResponse,
): CostlyNotificationEventInterface {
  return {
    events: response.data.events.map((event) => ({
      notificationEvent: event.notificationEvent,
      usage: event.usage,
    })),
  };
}

export function adaptGetMonthlyBilling(
  response: MonthlyBillingResponse,
): MonthlyBillingInterface {
  return {
    monthlyBillings: response.data.monthlyBillings.map((monthlyBilling) => ({
      date: monthlyBilling.date,
      usage: monthlyBilling.usage,
    })),
  };
}

export function adaptGetBalanceOverview(
  response: BalanceResponse,
): BalanceInterface {
  return {
    originalBalance: response.data.originalBalance,
    usedBalance: response.data.usedBalance,
    holdBalance: response.data.holdBalance,
    remainingBalance: response.data.remainingBalance,
    overageUsage: response.data.overageUsage,
    overageLimit: response.data.overageLimit,
    totalBilled: response.data.totalBilled,
    isOverage: response.data.isOverage,
  };
}
