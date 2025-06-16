import { Button } from "eds-react";
import {
  NotificationHistoryTabs,
  NotificatioHistoryDetailsFormProps,
  useNotificationHistoryForm,
  NotificationHistoryState,
  NotificationHistoryContext,
} from "@ejada/screens/NotificationHistory";
import { Context, useContext } from "react";

export const NotificationHistoryDetailsForm = ({
  onCancel,
  initialValues,
}: NotificatioHistoryDetailsFormProps) => {
  const { control, t, handleCancel } = useNotificationHistoryForm(
    onCancel,
    initialValues,
  );
  const { setIsDetailsFormOpen } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  return (
    <div className="h-full">
      <form className="flex flex-col h-full">
        <div className="flex-grow">
          <NotificationHistoryTabs
            onCancel={() => {
              setIsDetailsFormOpen(false);
            }}
            control={control}
            t={t}
            initialValues={initialValues}
          />
        </div>
        <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
        <div className=" w-full flex justify-end gap-[20px] p-4">
          <Button
            size="small"
            onClick={handleCancel}
            label={t("notificationHistory.cancel")}
            type="default"
            state="default"
            buttonVariant="outlined"
          />
        </div>
      </form>
    </div>
  );
};
