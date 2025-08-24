import { useContext } from "react";
import { Chart } from "eds-react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const MonthlyBilling: React.FC = () => {
  const { monthlyBillingData, isGetMonthlyBillingLoading } =
    useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetMonthlyBillingLoading && <LoadingItem />}
      {monthlyBillingData && (
        <Chart
          type="steppedLine"
          width="100%"
          categories={monthlyBillingData?.monthlyBillings.map((monthly) =>
            new Date(monthly.date).toLocaleString("default", {
              month: "short",
            }),
          )}
          series={[
            {
              name: t("dashboard.monthly_billing"),
              data: monthlyBillingData?.monthlyBillings.map(
                (monthly) => monthly.usage,
              ),
            },
          ]}
        />
      )}
    </>
  );
};
