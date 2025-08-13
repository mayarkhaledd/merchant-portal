import { LayoutWithSidebar } from "@ejada/common";
import { SideBarNavigation } from "@ejada/navigation";

export const Home = () => {
  return (
    <div className="flex">
      <LayoutWithSidebar items={SideBarNavigation} />
    </div>
  );
};
