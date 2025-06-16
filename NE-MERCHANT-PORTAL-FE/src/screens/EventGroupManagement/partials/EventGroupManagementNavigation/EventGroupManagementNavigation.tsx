import { Button, NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { NavigationBreadcrumb } from "@ejada/screens/shared";
import {
  EventGroupManagementContext,
  TEventGroupManagementState,
  useEventGroupManagement,
} from "@ejada/screens/EventGroupManagement";
import { Context, useContext } from "react";

export function EventGroupManagementNavigation() {
  const { t } = useTranslation();
  const { setAddNewEventGroupDrawer } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  const { EventGroupManagementData } = useEventGroupManagement();

  return (
    <>
      <NavigationBreadcrumb
        queryLabel={t("navigation.events_group_management") as string}
      />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle
          title={t("navigation.events_group_management") as string}
        />

        {EventGroupManagementData && EventGroupManagementData.length > 0 && (
          <div className="flex items-center justify-center">
            <Button
              size="large"
              label={t("eventGroupManagement.add_new_event")}
              onClick={() => {
                setAddNewEventGroupDrawer(true);
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
