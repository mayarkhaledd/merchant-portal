import { createContext, useContext, useEffect, useState } from "react";
import { useGetWhatsappOnboarding } from "@ejada/providers/whatsappProvider";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { GetWhatsappOnboardingInterface } from "@ejada/types/api/whatsappInterface";
import { WhatsappOnboardingContextType } from "./WhatsappOnboardingContext.types";
import { HTTPCookies } from "@ejada/common";

const WhatsappOnboardingContext = createContext<
  WhatsappOnboardingContextType | undefined
>(undefined);

export const WhatsappOnboardingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [onboardingParams, setOnboardingParams] =
    useState<GetWhatsappOnboardingInterface | null>(null);
  const tenantId = Cookies.get("tenantId")
    ? (Cookies.get("tenantId") as string)
    : "";
  const {
    updatedData: whatsappOnboardingData,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetWhatsappOnboarding({ tenantId }, false);

  useEffect(() => {
    if (isSuccess && whatsappOnboardingData) {
      setOnboardingParams(whatsappOnboardingData);
      if (
        whatsappOnboardingData.onboardingMetaAuth.metaBusinessAccounts.length >
        0
      ) {
        Cookies.set(HTTPCookies.showWhatsappTemplatesMenu, "true");
      } else {
        Cookies.set(HTTPCookies.showWhatsappTemplatesMenu, "false");
      }
    }
  }, [isSuccess, whatsappOnboardingData]);

  return (
    <WhatsappOnboardingContext.Provider
      value={{ params: onboardingParams, isLoading, isError, refetch }}
    >
      {children}
    </WhatsappOnboardingContext.Provider>
  );
};

export const useWhatsappOnboardingParams = () =>
  useContext(WhatsappOnboardingContext);
