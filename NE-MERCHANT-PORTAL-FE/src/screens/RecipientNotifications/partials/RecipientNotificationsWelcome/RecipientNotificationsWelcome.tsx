import { useTranslation } from "react-i18next";
import { Onboarding } from "@ejada/screens/shared";
import { IconFileArrowRight, IconSend } from "@tabler/icons-react";
import { Context, useContext } from "react";
import { TRecipientNotificationsState } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@ejada/navigation";

export function RecipientNotificationsWelcome() {
  const { t } = useTranslation();
  const { setIsCreateAdhocMessageOpen } =
    useContext<TRecipientNotificationsState>(
      RecipientNotificationsContext as Context<TRecipientNotificationsState>,
    );
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(AppRoutes.recipientEvent);
  };
  return (
    <>
      <Onboarding
        onClick={handleOnClick}
        title={t("recipient_notifications.welcome_notifications")}
        buttonLabel={t("recipient_notifications.send_event") as string}
        message={t("recipient_notifications.notifications_message")}
        secondaryButtonLabel={t("recipient_notifications.send_adhoc") as string}
        secondaryButtonIcon={<IconSend />}
        onSecondaryClick={() => {
          setIsCreateAdhocMessageOpen(true);
        }}
        buttonIcon={<IconFileArrowRight />}
      />
    </>
  );
}
