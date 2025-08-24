import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  useGetAvgChannelUsage,
  useGetBalanceOverview,
  useGetChannelUsage,
  useGetMonthlyBilling,
  useGetTopCostlyEvents,
  useGetTotalNotificationSent,
} from "@ejada/providers/dashboardProvider";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";
import { formattingMonth } from "./utils";

export const useDashboard = () => {
  const context = useWhatsappOnboardingParams();
  const refetch = context?.refetch;
  const hasBusiness =
    (context?.params?.onboardingMetaAuth.metaBusinessAccounts
      .length as number) > 0;

  const [fromDate, setFromDate] = useState<string>(
    formattingMonth(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    ),
  );
  const [toDate, setToDate] = useState<string>(formattingMonth(new Date()));

  const getDashboardPayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    fromDate: fromDate,
    toDate: toDate,
  };

  const getBalancePayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
  };

  const {
    updatedData: channelUsageData,
    refetch: refetchChannelUsage,
    isError: isGetChannelUsageError,
    isSuccess: isGetChannelUsageSuccess,
    isLoading: isGetChannelUsageLoading,
  } = useGetChannelUsage(
    {
      ...getDashboardPayload,
    },
    true,
  );

  const {
    updatedData: avgChannelUsageData,
    refetch: refetchAvgChannelUsage,
    isError: isGetAvgChannelUsageError,
    isSuccess: isGetAvgChannelUsageSuccess,
    isLoading: isGetAvgChannelUsageLoading,
  } = useGetAvgChannelUsage({ ...getDashboardPayload }, true);

  const {
    updatedData: totalNotificationSentData,
    refetch: refetchTotalNotificationSent,
    isError: isGetTotalNotificationSentError,
    isSuccess: isGetTotalNotificationSentSuccess,
    isLoading: isGetTotalNotificationSentLoading,
  } = useGetTotalNotificationSent({ ...getDashboardPayload }, true);

  const {
    updatedData: topCostlyEventsData,
    refetch: refetchTopCostlyEvents,
    isError: isGetTopCostlyEventsError,
    isSuccess: isGetTopCostlyEventsSuccess,
    isLoading: isGetTopCostlyEventsLoading,
  } = useGetTopCostlyEvents({ ...getDashboardPayload }, true);

  const {
    updatedData: monthlyBillingData,
    refetch: refetchMonthlyBilling,
    isError: isGetMonthlyBillingError,
    isSuccess: isGetMonthlyBillingSuccess,
    isLoading: isGetMonthlyBillingLoading,
  } = useGetMonthlyBilling({ ...getDashboardPayload }, true);

  const {
    updatedData: balanceData,
    refetch: refetchBalance,
    isError: isGetBalanceError,
    isSuccess: isGetBalanceSuccess,
    isLoading: isGetBalanceLoading,
  } = useGetBalanceOverview({ ...getBalancePayload }, true);

  useEffect(() => {
    if (getBalancePayload.tenantId) {
      refetchBalance?.();
    }
  }, [getBalancePayload.tenantId, refetchBalance]);

  useEffect(() => {
    // Give cookies time to clear/settle
    const timeoutId = setTimeout(() => {
      const tenantId = Cookies.get("tenantId");
      if (tenantId && tenantId.trim() !== "") {
        refetch?.();
        if (hasBusiness) {
          Cookies.set("showWhatsappTemplatesMenu", "true");
          window.location.reload();
        }
      }
    }, 100); // Small delay to let cookies settle

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      refetchChannelUsage?.();
      refetchAvgChannelUsage?.();
      refetchTotalNotificationSent?.();
      refetchTopCostlyEvents?.();
      refetchMonthlyBilling?.();
    }
  }, [
    fromDate,
    toDate,
    refetchChannelUsage,
    refetchAvgChannelUsage,
    refetchTotalNotificationSent,
    refetchTopCostlyEvents,
    refetchMonthlyBilling,
  ]);

  return {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    channelUsageData,
    avgChannelUsageData,
    totalNotificationSentData,
    topCostlyEventsData,
    monthlyBillingData,
    balanceData,
    isGetChannelUsageError,
    isGetAvgChannelUsageError,
    isGetTotalNotificationSentError,
    isGetTopCostlyEventsError,
    isGetMonthlyBillingError,
    isGetBalanceError,
    isGetChannelUsageSuccess,
    isGetAvgChannelUsageSuccess,
    isGetTotalNotificationSentSuccess,
    isGetTopCostlyEventsSuccess,
    isGetMonthlyBillingSuccess,
    isGetBalanceSuccess,
    isGetChannelUsageLoading,
    isGetAvgChannelUsageLoading,
    isGetTotalNotificationSentLoading,
    isGetTopCostlyEventsLoading,
    isGetMonthlyBillingLoading,
    isGetBalanceLoading,
  };
};
