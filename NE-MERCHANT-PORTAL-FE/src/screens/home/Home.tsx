import { LayoutWithSidebar } from "@ejada/common";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";
import { SideBarNavigation } from "@ejada/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const Home = () => {
  const context = useWhatsappOnboardingParams();
  const refetch = context?.refetch;
  const hasBusiness =
    (context?.params?.onboardingMetaAuth.metaBusinessAccounts
      .length as number) > 0;

  useEffect(() => {
    // Give cookies time to clear/settle
    const timeoutId = setTimeout(() => {
      const tenantId = Cookies.get("tenantId");
      if (tenantId && tenantId.trim() !== "") {
        refetch?.();
        if (hasBusiness) {
          Cookies.set("showWhatsappTemplatesMenu", "true");
          window.location.reload();
        }
      }
    }, 100); // Small delay to let cookies settle

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex">
      <LayoutWithSidebar items={SideBarNavigation} />
    </div>
  );
};
