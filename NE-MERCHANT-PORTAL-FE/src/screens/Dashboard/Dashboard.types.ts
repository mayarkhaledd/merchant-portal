import {
  BalanceInterface,
  ChannelUsageInterface,
  CostlyNotificationEventInterface,
  MonthlyBillingInterface,
  TotalNotificationSentInterface,
} from "@ejada/types/api/dashboardInterface";

export interface DashboardState {
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  channelUsageData: ChannelUsageInterface | null;
  avgChannelUsageData: ChannelUsageInterface | null;
  totalNotificationSentData: TotalNotificationSentInterface | null;
  topCostlyEventsData: CostlyNotificationEventInterface | null;
  monthlyBillingData: MonthlyBillingInterface | null;
  balanceData: BalanceInterface | null;
  isGetChannelUsageError: boolean;
  isGetAvgChannelUsageError: boolean;
  isGetTotalNotificationSentError: boolean;
  isGetTopCostlyEventsError: boolean;
  isGetMonthlyBillingError: boolean;
  isGetBalanceError: boolean;
  isGetChannelUsageSuccess: boolean;
  isGetAvgChannelUsageSuccess: boolean;
  isGetTotalNotificationSentSuccess: boolean;
  isGetTopCostlyEventsSuccess: boolean;
  isGetMonthlyBillingSuccess: boolean;
  isGetBalanceSuccess: boolean;
  isGetChannelUsageLoading: boolean;
  isGetAvgChannelUsageLoading: boolean;
  isGetTotalNotificationSentLoading: boolean;
  isGetTopCostlyEventsLoading: boolean;
  isGetMonthlyBillingLoading: boolean;
  isGetBalanceLoading: boolean;
}
