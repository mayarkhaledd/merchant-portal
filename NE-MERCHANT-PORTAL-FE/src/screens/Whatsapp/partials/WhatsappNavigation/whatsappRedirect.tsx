import { AppRoutes } from "@ejada/navigation";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function WhatsappRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    if (path === "/whatsapp" || path === "/whatsapp/") {
      navigate(AppRoutes.templates, { replace: true });
    }
  }, [path, navigate]);

  return null;
}
