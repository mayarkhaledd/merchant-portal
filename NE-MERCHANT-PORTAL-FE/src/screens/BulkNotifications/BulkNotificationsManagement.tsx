import { BulkNotificationsModals } from "./BulkNotificationsModals";
import { BulkNotificationsProvider } from "./BulkNotificationsProvider";
import { BulkNotificationsNavigation } from "./partials/BulkNotificationsNavigation/BulkNotificationsNavigation";
import { BulkNotificationsWelcome } from "./partials/BulkNotificationsWelcome/BulkNotificationsWelcome";
import { Outlet } from "react-router-dom";
import { usePath } from "@ejada/screens/shared";
import { AppRoutes } from "@ejada/navigation";
export function BulkNotificationsManagement() {
  const path = usePath();
  return (
    <BulkNotificationsProvider>
      <BulkNotificationsNavigation />
      {path !== AppRoutes.eventMessage ? (
        <BulkNotificationsWelcome />
      ) : (
        <Outlet />
      )}
      <BulkNotificationsModals />
    </BulkNotificationsProvider>
  );
}
