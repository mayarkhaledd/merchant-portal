import React, { ReactNode, createContext } from "react";
import { TCustomerManagementState } from "./CustomerManagement.types";
import { useCustomerManagement } from "./useCustomerManagement";

export const CustomerManagementContext =
  createContext<TCustomerManagementState>({} as TCustomerManagementState);

export const CustomerManagementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useCustomerManagement();
  return (
    <CustomerManagementContext.Provider value={context}>
      {children}
    </CustomerManagementContext.Provider>
  );
};
