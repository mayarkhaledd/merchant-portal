import { useContext } from "react";
import { DashboardContext } from "../../DashboardProvider";
import { CardCustom } from "../ui/CardCustom";
import { LoadingItem } from "../ui/LoadingItem";
import { BalanceOverview } from "../Charts/BalanceOverview";
import { OverageArc } from "../Charts/OverageArc";
import { formatMoney } from "../../utils";
import { useTranslation } from "react-i18next";

export const BalanceDetails: React.FC = () => {
  const { balanceData, isGetBalanceLoading } = useContext(DashboardContext);
  const { t } = useTranslation();

  return (
    <div className="w-full p-4">
      <div className="grid grid-flow-row auto-rows-max gap-4">
        {isGetBalanceLoading && <LoadingItem />}
        {balanceData && (
          <div className="grid grid-cols-4 gap-4">
            <CardCustom color="bg-sky-100">
              <h2 className="text-sm font-light">
                {t("dashboard.your_balance")}
              </h2>
              <h1 className="text-lg font-semibold">
                {formatMoney(balanceData.originalBalance)}
              </h1>
            </CardCustom>
            <CardCustom color="bg-lime-100">
              <h2 className="text-sm font-light">
                {t("dashboard.used_balance")}
              </h2>
              <h1 className="text-lg font-semibold">
                {formatMoney(balanceData.usedBalance)}
              </h1>
            </CardCustom>
            <CardCustom color="bg-amber-100">
              <h2 className="text-sm font-light">
                {t("dashboard.hold_balance")}
              </h2>
              <h1 className="text-lg font-semibold">
                {formatMoney(balanceData.holdBalance)}
              </h1>
            </CardCustom>
            <CardCustom color="bg-green-100">
              <h2 className="text-sm font-light">
                {t("dashboard.remaining_balance")}
              </h2>
              <h1 className="text-lg font-semibold">
                {formatMoney(balanceData.remainingBalance)}
              </h1>
            </CardCustom>
          </div>
        )}
        <div
          className={`grid gap-4 mb-4 ${balanceData?.isOverage ? "grid-cols-2" : "grid-cols-1"}`}
        >
          <CardCustom title={t("dashboard.balance_overview").toString()}>
            <BalanceOverview />
          </CardCustom>
          {balanceData?.isOverage && (
            <div className="grid grid-flow-row auto-rows-max gap-4">
              <div className="grid grid-cols-2 gap-4">
                <CardCustom color="bg-rose-100">
                  <h2 className="text-sm font-light">
                    {t("dashboard.overage_limit")}
                  </h2>
                  <h1 className="text-lg font-semibold">
                    {formatMoney(balanceData.overageLimit)}
                  </h1>
                </CardCustom>
                <CardCustom color="bg-red-100">
                  <h2 className="text-sm font-light">
                    {t("dashboard.overage_usage")}
                  </h2>
                  <h1 className="text-lg font-semibold">
                    {formatMoney(balanceData.overageUsage)}
                  </h1>
                </CardCustom>
              </div>
              <CardCustom title={t("dashboard.overage_usage").toString()}>
                <OverageArc />
              </CardCustom>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
