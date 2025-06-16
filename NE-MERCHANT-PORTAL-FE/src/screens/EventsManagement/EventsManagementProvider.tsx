import React from "react";
import { ReactNode, createContext } from "react";
import {
  TEventsManagementState,
  useEventsManagement,
} from "@ejada/screens/EventsManagement";

export const EventsManagementContext = createContext<TEventsManagementState>(
  {} as TEventsManagementState,
);

export const EventsManagementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const EventsContext = useEventsManagement();

  return (
    <>
      <EventsManagementContext.Provider
        value={{
          ...EventsContext,
        }}
      >
        {children}
      </EventsManagementContext.Provider>
    </>
  );
};
