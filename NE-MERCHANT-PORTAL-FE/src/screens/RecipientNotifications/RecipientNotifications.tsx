import { Outlet } from "react-router-dom";
import { usePath } from "@ejada/screens/shared";
import { RecipientNotificationsModals } from "./RecipientNotificationsModals";
import { RecipientNotificationPRovider } from "./RecipientNotificationsProvider";
import { RecipientNotificationsNavigation } from "./partials/RecipientNotificationsNavigation/RecipientNotificationsNavigation";
import { RecipientNotificationsWelcome } from "./partials/RecipientNotificationsWelcome/RecipientNotificationsWelcome";
import { AppRoutes } from "@ejada/navigation";

export function RecipientNotifications() {
  const path = usePath();

  return (
    <RecipientNotificationPRovider>
      <RecipientNotificationsNavigation />
      {path !== AppRoutes.recipientEvent ? (
        <RecipientNotificationsWelcome />
      ) : (
        <Outlet />
      )}
      <RecipientNotificationsModals />
    </RecipientNotificationPRovider>
  );
}
