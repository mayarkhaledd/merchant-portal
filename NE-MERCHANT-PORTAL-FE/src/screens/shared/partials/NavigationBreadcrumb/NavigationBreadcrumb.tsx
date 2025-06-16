import { BreadCrumb } from "eds-react";
import { AppRoutes } from "@ejada/navigation";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type TNavigationBreadcrumb = {
  path: string;
  label: string;
};
export function NavigationBreadcrumb({ queryLabel }: { queryLabel?: string }) {
  const { t } = useTranslation();
  const location = useLocation();

  const getBreadcrumbItems = (): TNavigationBreadcrumb[] | undefined => {
    if (!location || !location.pathname) return undefined;

    const items: TNavigationBreadcrumb[] = [
      {
        path: AppRoutes.dashboard,
        label: t("navigation.home"),
      },
    ];

    // Split the pathname into segments and filter out empty segments
    const navigationItems = location.pathname.split("/").filter(Boolean);
    const searchParams = new URLSearchParams(location.search);
    const queryValue = searchParams.get("query");

    let cumulativePath = "";
    // Limit to maximum 2 additional segments (plus home = 3 total)
    const limitedItems = navigationItems.slice(0, 3);

    limitedItems.forEach((item) => {
      cumulativePath += `/${item}`;
      items.push({
        path: cumulativePath,
        label: t(`navigation.${item}`),
      });
    });

    // Add breadcrumb for query parameter if it exists and we haven't exceeded 3 parts
    if (queryLabel && queryValue && items.length < 3) {
      items.push({
        path: location.pathname + location.search,
        label: `${queryLabel} ${queryValue}`,
      });
    }
    return items;
  };
  return <BreadCrumb items={getBreadcrumbItems()} />;
}
