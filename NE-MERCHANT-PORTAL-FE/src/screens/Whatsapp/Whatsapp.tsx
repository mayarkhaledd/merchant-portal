import { Outlet } from "react-router-dom";
import { WhatsappModals } from "./partials/WhatsappModals/WhatsappModals";
import { WhatsappNavigation } from "./partials/WhatsappNavigation/WhatsappNavigation";
import { WhatsappTable } from "./partials/WhatsappTable/WhatsappTable";
import { WhatsappProvider } from "./WhatsappProvider";
import { AppRoutes } from "@ejada/navigation";
import { useLocation } from "react-router-dom";

function useWhatsappViewMode(): boolean {
  const location = useLocation();
  const path = location.pathname;

  return (
    path.startsWith(
      `/${AppRoutes.templates}/${AppRoutes.createWhatsappTemplate}`,
    ) ||
    path.startsWith(
      `/${AppRoutes.templates}/${AppRoutes.editWhatsappTemplate}`,
    ) ||
    path.startsWith(`/${AppRoutes.templates}/${AppRoutes.viewWhatsappTemplate}`)
  );
}

export function Whatsapp() {
  const isViewOrEdit = useWhatsappViewMode();

  return (
    <WhatsappProvider>
      <WhatsappModals />
      <WhatsappNavigation />
      {!isViewOrEdit ? (
        <>
          <WhatsappTable />
        </>
      ) : (
        <Outlet />
      )}
    </WhatsappProvider>
  );
}
