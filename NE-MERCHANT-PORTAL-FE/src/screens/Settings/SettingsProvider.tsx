import React from "react";
import { ReactNode, createContext } from "react";
import { useSettings } from "./useSettings";
import { SettingsState } from "./Settings.types";

export const SettingsContext = createContext<SettingsState>(
  {} as SettingsState,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useSettings();

  return (
    <>
      <SettingsContext.Provider
        value={{
          ...context,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </>
  );
};
