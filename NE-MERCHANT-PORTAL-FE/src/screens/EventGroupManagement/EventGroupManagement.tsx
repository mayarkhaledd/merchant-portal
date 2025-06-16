import {
  EventGroupManagementModals,
  EventGroupManagementNavigation,
  EventGroupManagementProvider,
  EventGroupManagementTable,
} from "@ejada/screens/EventGroupManagement";

export function EventGroupManagement() {
  return (
    <EventGroupManagementProvider>
      <EventGroupManagementModals />
      <EventGroupManagementNavigation />
      <EventGroupManagementTable />
    </EventGroupManagementProvider>
  );
}
