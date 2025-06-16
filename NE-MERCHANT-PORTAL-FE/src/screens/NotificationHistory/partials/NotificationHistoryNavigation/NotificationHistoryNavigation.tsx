import { NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";

export function NotificationHistoryNavigation() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBreadcrumb
        queryLabel={t("navigation.notification-history") as string}
      />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle
          title={t("navigation.notification-history") as string}
        />
      </div>
    </>
  );
}
