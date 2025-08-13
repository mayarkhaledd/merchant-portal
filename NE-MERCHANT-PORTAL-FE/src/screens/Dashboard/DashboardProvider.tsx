import { createContext, ReactNode } from "react";

import { DashboardState } from "./Dashboard.types";
import { useDashboard } from "./useDashboard";

export const DashboardContext = createContext<DashboardState | undefined>(
  undefined,
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useDashboard();

  return (
    <DashboardContext.Provider value={context}>
      {children}
    </DashboardContext.Provider>
  );
};
