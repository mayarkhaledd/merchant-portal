import { ResponseInterface } from "./responseInterface";

export interface DashboardPayload {
  tenantId: string;
  fromDate: string;
  toDate: string;
}

export interface BalanceOverviewPayload {
  tenantId: string;
}

// Channel usage interface
export interface ChannelUsage {
  channel: string;
  usage: number;
}
export interface ChannelUsageInterface {
  channels: ChannelUsage[];
}
export interface ChannelUsageResponse
  extends ResponseInterface<ChannelUsageInterface> {}

// Total notification interface
export interface TotalNotificationSentInterface {
  total: number;
}
export interface TotalNotificationSentResponse
  extends ResponseInterface<TotalNotificationSentInterface> {}

// Costly notification interface
export interface CostlyNotificationEvent {
  notificationEvent: string;
  usage: number;
}
export interface CostlyNotificationEventInterface {
  events: CostlyNotificationEvent[];
}
export interface CostlyNotificationEventResponse
  extends ResponseInterface<CostlyNotificationEventInterface> {}

// Monthly billing interface
export interface MonthlyBilling {
  date: string;
  usage: number;
}
export interface MonthlyBillingInterface {
  monthlyBillings: MonthlyBilling[];
}
export interface MonthlyBillingResponse
  extends ResponseInterface<MonthlyBillingInterface> {}

// Balance overview
export interface BalanceInterface {
  originalBalance: number;
  usedBalance: number;
  holdBalance: number;
  remainingBalance: number;
  overageLimit: number;
  overageUsage: number;
  totalBilled: number;
  isOverage: boolean;
}
export interface BalanceResponse extends ResponseInterface<BalanceInterface> {}
