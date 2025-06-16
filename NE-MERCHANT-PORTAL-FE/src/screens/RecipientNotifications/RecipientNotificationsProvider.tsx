import React from "react";
import { ReactNode, createContext } from "react";
import { useRecipientNotifications } from "./useRecipientNotifications";
import { TRecipientNotificationsState } from "./RecipientNotifications.types";

export const RecipientNotificationsContext = createContext<
  TRecipientNotificationsState | undefined
>(undefined);

export const RecipientNotificationPRovider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useRecipientNotifications();
  return (
    <>
      <RecipientNotificationsContext.Provider value={context}>
        {children}
      </RecipientNotificationsContext.Provider>
    </>
  );
};
