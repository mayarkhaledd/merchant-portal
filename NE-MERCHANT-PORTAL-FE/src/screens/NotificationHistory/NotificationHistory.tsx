import {
  NotificationHistoryNavigation,
  NotificationHistoryProvider,
  NotificationHistoryTable,
  NotificationHistoryModals,
} from "@ejada/screens/NotificationHistory";
export function NotificationHistory() {
  return (
    <NotificationHistoryProvider>
      <NotificationHistoryModals />
      <NotificationHistoryNavigation />
      <NotificationHistoryTable />
    </NotificationHistoryProvider>
  );
}
