import { useTranslation } from "react-i18next";
import { Onboarding } from "@ejada/screens/shared";
import { IconFileArrowRight, IconSend } from "@tabler/icons-react";
import { BulkNotificationsContext } from "@ejada/screens/BulkNotifications/BulkNotificationsProvider";
import { Context, useContext } from "react";
import { TBulkNotificationsState } from "@ejada/screens/BulkNotifications/BulkNotificationsManagement.types";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";

export function BulkNotificationsWelcome() {
  const { t } = useTranslation();
  const { setIsCreateAdhocMessageOpen } = useContext<TBulkNotificationsState>(
    BulkNotificationsContext as Context<TBulkNotificationsState>,
  );

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(AppRoutes.eventMessage);
  };
  return (
    <>
      <Onboarding
        onClick={handleOnClick}
        title={t("bulk-notifications.welcome_notifications")}
        buttonLabel={t("bulk-notifications.send_event") as string}
        message={t("bulk-notifications.notifications_message")}
        secondaryButtonLabel={t("bulk-notifications.send_adhoc") as string}
        secondaryButtonIcon={<IconSend />}
        onSecondaryClick={() => {
          setIsCreateAdhocMessageOpen(true);
        }}
        buttonIcon={<IconFileArrowRight />}
      />
    </>
  );
}
