import { LayoutWithSidebar } from "@ejada/common";
import { SideBarNavigation } from "@ejada/navigation";

export function Dashboard() {
  return (
    <div className="flex">
      <LayoutWithSidebar items={SideBarNavigation} />
    </div>
  );
}
