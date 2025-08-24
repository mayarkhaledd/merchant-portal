import { DashboardCharts } from "./partials/DashboardCharts";
import { DashboardProvider } from "./DashboardProvider";
import { BalanceDetails } from "./partials/BalanceDetails/BalanceDetails";
import { DashboardFilterForm } from "./partials/DashboardFilter/DashboardFilterForm";

export function Dashboard() {
  return (
    <DashboardProvider>
      <BalanceDetails />
      <DashboardFilterForm />
      <DashboardCharts />
    </DashboardProvider>
  );
}
