import { useState } from "react";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useDashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);
  const context = useWhatsappOnboardingParams();
  const refetch = context?.refetch;
  const hasBusiness =
    (context?.params?.onboardingMetaAuth.metaBusinessAccounts
      .length as number) > 0;

  useEffect(() => {
    if (Cookies.get("tenantId") !== "") {
      refetch?.();
      if (hasBusiness) {
        Cookies.set("showWhatsappTemplatesMenu", "true");
        window.location.reload();
      }
    }
  }, []);

  return {
    isFilterOpen,
    setIsFilterOpen,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalListSize,
    setTotalListSize,
  };
};
