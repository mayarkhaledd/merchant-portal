import { AppRoutes } from "@ejada/navigation";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function WhatsappRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const whatsappPath = AppRoutes.whatsapp;

    if (
      currentPath.endsWith(whatsappPath) ||
      currentPath.endsWith(whatsappPath + "/")
    ) {
      navigate(AppRoutes.templates, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
