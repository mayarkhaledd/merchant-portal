import { Sidebar, Popup } from "eds-react";
import { MenuItem } from "@ejada/types";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@ejada/common/wrappers";
import { Navbar } from "@ejada/screens/shared/partials/NavBar";
import navAvatar from "../../assets/navAvatar.svg";
import { useTranslation } from "react-i18next";
import { useSessionExpired } from "./useSessionExpired";
import i18n from "@ejada/common/locals/i18n";

interface LayoutWithSidebarProps {
  items: MenuItem[];
  children?: React.ReactNode;
}

export const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = React.memo(
  ({ items, children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { handleExtend, isSessionExpired, handleLogout } =
      useSessionExpired();

    // Memoize components to prevent unnecessary re-renders
    const sidebarComponent = useMemo(
      () => (
        <div className={`transition-all duration-300 relative z-50`}>
          <Sidebar items={items} />
        </div>
      ),
      [items],
    );

    const navbarComponent = useMemo(
      () => (
        <div className="z-40 -mb-16">
          <Navbar
            icon={navAvatar}
            title={
              t("navigation.notifications_engine_merchant_portal") as string
            }
            showAppTypeDropDown
          />
        </div>
      ),
      [t],
    );

    const mainContent = useMemo(
      () => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          key={location.pathname}
        >
          {children || <Outlet />}
        </ErrorBoundary>
      ),
      [children, location.pathname],
    );

    return (
      <div className="flex w-full h-screen overflow-hidden">
        {sidebarComponent}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {navbarComponent}
          <div className="flex-1 mt-16 p-10 overflow-y-auto bg-light-white">
            {mainContent}
          </div>
        </div>
        {isSessionExpired && (
          <div className="logout-popup">
            <Popup
              title={i18n.t("session_expired")}
              body={
                <p className="text-sm text-[#334D6E] font-readexProMedium500">
                  {i18n.t("login_again")}
                </p>
              }
              confirmLabel={i18n.t("extend_session") as string}
              onConfirm={handleExtend}
              onClose={handleLogout}
              step={0}
            />
          </div>
        )}
      </div>
    );
  },
);

LayoutWithSidebar.displayName = "LayoutWithSidebar";
