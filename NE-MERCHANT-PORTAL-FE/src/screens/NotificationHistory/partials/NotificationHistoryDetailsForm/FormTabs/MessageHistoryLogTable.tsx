import { Table } from "eds-react";
import {
  NotificatioHistoryDetailsFormProps,
  useMessageHistoryLogTableColumns,
  useNotificationHistoryForm,
} from "@ejada/screens/NotificationHistory";
export const MessageHistoryLogTable = ({
  onCancel,
  initialValues,
}: NotificatioHistoryDetailsFormProps) => {
  const { statusLogHistoryData } = useNotificationHistoryForm(
    onCancel,
    initialValues,
  );
  const MessageHistoryLogTableColumns = useMessageHistoryLogTableColumns({
    onCancel,
    initialValues,
  } as NotificatioHistoryDetailsFormProps);
  return (
    <>
      <div className="mt-[-2.25rem] w-full">
        <div className="-mx-4">
          {statusLogHistoryData && (
            <Table
              data={statusLogHistoryData ? statusLogHistoryData : []}
              columns={MessageHistoryLogTableColumns}
              isColumnSelectorEnabled={false}
              variants="zebraStripe"
              backgroundColor="bg-transparent"
              disablePagination
            />
          )}
        </div>
      </div>
    </>
  );
};
