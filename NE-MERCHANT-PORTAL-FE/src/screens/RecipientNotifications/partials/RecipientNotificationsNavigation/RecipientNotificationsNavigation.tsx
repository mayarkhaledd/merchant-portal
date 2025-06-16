import { NavigationBreadcrumb } from "@ejada/screens/shared";
import { NavigationTitle } from "eds-react";
import i18next from "i18next";

export function RecipientNotificationsNavigation() {
  return (
    <>
      <NavigationBreadcrumb
        queryLabel={i18next.t("navigation.recipients_notifications") as string}
      />
      <div className="flex justify-between items-center mb-10 mt-7">
        <NavigationTitle
          title={i18next.t("navigation.recipients_notifications")}
        />
        <div className="flex">
          <div></div>
        </div>
      </div>
    </>
  );
}
