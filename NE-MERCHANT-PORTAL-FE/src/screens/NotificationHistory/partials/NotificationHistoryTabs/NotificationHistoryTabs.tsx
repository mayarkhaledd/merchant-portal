import { Tabs } from "eds-react";
import {
  useNotificationHistoryTabs,
  NotificatioHistoryDetailsFormProps,
} from "@ejada/screens/NotificationHistory";

export function NotificationHistoryTabs({
  onCancel,
  control,
  t,
  initialValues,
}: NotificatioHistoryDetailsFormProps) {
  const { NotificationHistoryTabs } = useNotificationHistoryTabs(
    onCancel,
    control,
    t,
    initialValues,
  );
  return (
    <>
      <Tabs tabs={NotificationHistoryTabs} transparentTabs={true} />
    </>
  );
}
