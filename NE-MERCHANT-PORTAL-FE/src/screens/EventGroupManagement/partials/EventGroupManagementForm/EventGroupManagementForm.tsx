import { Button } from "eds-react";

import {
  EventGroupManagementData,
  useEventGroupManagementForm,
  EventGroupManagementProps,
  TEventGroupManagementState,
  EventGroupManagementContext,
} from "@ejada/screens/EventGroupManagement";
import { Context, useContext } from "react";
export const EventGroupManagementForm: React.FC<EventGroupManagementProps> = ({
  closeDrawer,
  mode,
  initialValues,
}) => {
  const {
    handleSubmit,
    handleCancel,
    onSubmit,
    t,
    control,
    formState,
    sourceSystemsMenu,
  } = useEventGroupManagementForm(closeDrawer, mode, initialValues);
  const {
    setIsViewEventGroupDrawer,
    setAddNewEventGroupDrawer,
    setEditEventGroupDrawer,
  } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  return (
    <div className="">
      <form className="relative  h-full">
        <div className="max-h-[calc(100vh-215px)] overflow-y-auto pe-6">
          <div className="">
            <EventGroupManagementData
              control={control}
              mode={mode}
              formState={formState}
              initialValues={initialValues}
              closeDrawer={() => {
                setIsViewEventGroupDrawer(false);
                setAddNewEventGroupDrawer(false);
                setEditEventGroupDrawer(false);
              }}
              sourceSystemsMenu={sourceSystemsMenu ?? []}
            />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-divider-color flex justify-between items-center">
          <div></div>
          <div className="flex gap-4">
            <Button
              state="default"
              type="default"
              size="medium"
              buttonVariant="outlined"
              onClick={handleCancel}
              label={t("eventGroupManagement.filter_menu.cancel")}
              className="!min-w-[100px]"
            />
            <Button
              label={t("eventGroupManagement.filter_menu.save")}
              size="medium"
              state={!formState.isValid ? "disabled" : "default"}
              type="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
