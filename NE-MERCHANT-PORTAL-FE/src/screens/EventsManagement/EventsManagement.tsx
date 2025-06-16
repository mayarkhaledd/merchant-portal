import {
  EventsManagementModals,
  EventsManagementNavigation,
  EventsManagementProvider,
  EventsTable,
} from "@ejada/screens/EventsManagement";
export function EventsManagement() {
  return (
    <EventsManagementProvider>
      <EventsManagementModals />
      <EventsManagementNavigation />
      <EventsTable />
    </EventsManagementProvider>
  );
}
