import React from "react";
import { ReactNode, createContext } from "react";
import { TEventGroupManagementState } from "@ejada/screens/EventGroupManagement";
import { useEventGroupManagement } from "@ejada/screens/EventGroupManagement/useEventGroupManagement";

export const EventGroupManagementContext = createContext<
  TEventGroupManagementState | undefined
>(undefined);

export const EventGroupManagementProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useEventGroupManagement();
  return (
    <>
      <EventGroupManagementContext.Provider value={context}>
        {children}
      </EventGroupManagementContext.Provider>
    </>
  );
};
