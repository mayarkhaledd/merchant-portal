import React from "react";
import { ReactNode, createContext } from "react";
import { useEmailBuilder } from "@ejada/screens/EmailBuilder/useEmailBuilder";
import { TEmailTemplateState } from "./EmailBuilder.types";

export const EmailTemplateContext = createContext<
  TEmailTemplateState | undefined
>(undefined);

export const EmailTemplateProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const context = useEmailBuilder();
  return (
    <>
      <EmailTemplateContext.Provider value={context}>
        {children}
      </EmailTemplateContext.Provider>
    </>
  );
};
