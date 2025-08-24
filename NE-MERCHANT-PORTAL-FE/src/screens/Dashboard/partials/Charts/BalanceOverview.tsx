import { Chart } from "eds-react";
import { useContext } from "react";
import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const BalanceOverview: React.FC = () => {
  const { balanceData, isGetBalanceLoading } = useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetBalanceLoading && <LoadingItem />}
      {balanceData && (
        <Chart
          type="halfDoughnut"
          width="100%"
          labels={[
            t("dashboard.billed_balance"),
            t("dashboard.remaining_balance"),
          ]}
          series={[balanceData?.totalBilled, balanceData?.remainingBalance]}
        />
      )}
    </>
  );
};
