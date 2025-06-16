import { CustomerManagementProvider } from "./CustomerManagementProvider";
import { CustomerManagementNavigation } from "./partials/CustomerManagementNavigation/CustomerManagementNavigation";
import { CustomerManagementTable } from "./partials/CustomerManagementTable/CustomerManagementTable";
import { CustomerManagementModal } from "./CustomerManagementModal";

export function CustomerManagement() {
  return (
    <CustomerManagementProvider>
      <CustomerManagementNavigation />
      <CustomerManagementModal />
      <CustomerManagementTable />
    </CustomerManagementProvider>
  );
}
