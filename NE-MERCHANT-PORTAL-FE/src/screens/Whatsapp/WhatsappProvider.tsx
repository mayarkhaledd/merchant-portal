import React from "react";
import { ReactNode, createContext } from "react";
import { useWhatsapp } from "./useWhatsapp";
import { TWhatsappState } from "./Whatsapp.types";

export const WhatsappContext = createContext<TWhatsappState>(
  {} as TWhatsappState,
);

export const WhatsappProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useWhatsapp();

  return (
    <>
      <WhatsappContext.Provider
        value={{
          ...context,
        }}
      >
        {children}
      </WhatsappContext.Provider>
    </>
  );
};
