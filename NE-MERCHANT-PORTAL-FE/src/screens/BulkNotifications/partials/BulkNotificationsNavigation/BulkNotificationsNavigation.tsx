import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";
import { NavigationTitle } from "eds-react";

export function BulkNotificationsNavigation() {
  const { t } = useTranslation();
  return (
    <>
      <NavigationBreadcrumb />
      <div className="flex justify-between items-center mb-10 mt-7">
        <NavigationTitle
          title={`${t("bulk-notifications.bulk_notifications")}`}
        />
        <div className="flex">
          <div></div>
        </div>
      </div>
    </>
  );
}
