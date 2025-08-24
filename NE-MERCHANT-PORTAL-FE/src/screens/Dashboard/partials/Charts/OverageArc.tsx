import { useContext } from "react";
import { Chart } from "eds-react";

import { DashboardContext } from "../../DashboardProvider";
import { LoadingItem } from "../ui/LoadingItem";
import { useTranslation } from "react-i18next";

export const OverageArc: React.FC = () => {
  const { balanceData, isGetBalanceLoading } = useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <>
      {isGetBalanceLoading && <LoadingItem />}
      {balanceData && (
        <Chart
          type="arc"
          width="100%"
          labels={[t("dashboard.usage")]}
          series={[balanceData?.overageUsage]}
        />
      )}
    </>
  );
};
