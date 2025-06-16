import React from "react";
import { ReactNode, createContext } from "react";
import { useBulkNotifications } from "./useBulkNotificationsManagement";
import { TBulkNotificationsState } from "./BulkNotificationsManagement.types";

export const BulkNotificationsContext = createContext<
  TBulkNotificationsState | undefined
>(undefined);

export const BulkNotificationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useBulkNotifications();
  return (
    <>
      <BulkNotificationsContext.Provider value={context}>
        {children}
      </BulkNotificationsContext.Provider>
    </>
  );
};
