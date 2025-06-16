import { NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";

export function EventsManagementNavigation() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBreadcrumb queryLabel={t("navigation.my_profile") as string} />
      <div>
        <NavigationTitle title={t("navigation.my_profile") as string} />
      </div>
    </>
  );
}
