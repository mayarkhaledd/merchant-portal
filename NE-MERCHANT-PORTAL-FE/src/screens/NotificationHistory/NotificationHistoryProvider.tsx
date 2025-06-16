import React from "react";
import { ReactNode, createContext } from "react";
import {
  NotificationHistoryState,
  useNotificationHistory,
} from "@ejada/screens/NotificationHistory";

export const NotificationHistoryContext = createContext<
  NotificationHistoryState | undefined
>(undefined);

export const NotificationHistoryProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useNotificationHistory();
  return (
    <>
      <NotificationHistoryContext.Provider value={context}>
        {children}
      </NotificationHistoryContext.Provider>
    </>
  );
};
