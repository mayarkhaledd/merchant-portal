import { NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";

export function EventsManagementNavigation() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBreadcrumb queryLabel={t("navigation.settings") as string} />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle title={t("navigation.settings") as string} />
        <div className="flex items-center justify-center"></div>
      </div>
    </>
  );
}
