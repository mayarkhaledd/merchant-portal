import { Button, NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { NavigationBreadcrumb } from "@ejada/screens/shared";
import {
  EventsManagementContext,
  TEventsManagementState,
  useEventsManagement,
} from "@ejada/screens/EventsManagement";
import { Context, useContext } from "react";

export function EventsManagementNavigation() {
  const { t } = useTranslation();
  const { setAddNewEventDrawer } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );
  const { EventsManagementData } = useEventsManagement();

  return (
    <>
      <NavigationBreadcrumb
        queryLabel={t("navigation.events_management") as string}
      />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle title={t("navigation.events_management") as string} />

        {EventsManagementData && (
          <div className="flex items-center justify-center">
            <Button
              size="large"
              label={t("eventsManagement.add_new_event")}
              onClick={() => {
                setAddNewEventDrawer(true);
              }}
              type="withIcon"
              icon={<FaPlus />}
              state="default"
            />
          </div>
        )}
      </div>
    </>
  );
}
