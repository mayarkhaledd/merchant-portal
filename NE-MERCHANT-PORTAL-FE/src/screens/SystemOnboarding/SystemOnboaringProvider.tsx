import { ReactNode, createContext } from "react";
import { useSystemOnboarding } from "./useSystemOnboarding";
import { Tsystemstate } from "./SystemonBoarding.types";

export const SystemOnboardingContext = createContext<Tsystemstate | undefined>(
  undefined,
);

export const SystemOnboaringProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isPopupOpen,
    setIsPopupOpen,
    isEditDrawer,
    setIsEditDrawer,
    selectedSystem,
    setSelectedSystem,
    systemOnboardingTableData,
    choice,
    setChoice,
    sourceSystemsMenu,
    setSourceSystemsMenu,
    deleteSourceSystemById,
    isDeleteSourceSystemByIdError,
    isDeleteSourceSystemByIdSuccess,
    refetchSourceSystem,
    isDeletePopUpOpen,
    setIsDeletePopUpOpen,
    systemId,
    setSystemId,
    deleteSourceSystemErrorDetails,
  } = useSystemOnboarding();
  return (
    <>
      <SystemOnboardingContext.Provider
        value={{
          isDrawerOpen,
          setIsDrawerOpen,
          isPopupOpen,
          setIsPopupOpen,
          isEditDrawer,
          setIsEditDrawer,
          selectedSystem,
          setSelectedSystem,
          systemOnboardingTableData,
          choice,
          setChoice,
          sourceSystemsMenu,
          setSourceSystemsMenu,
          deleteSourceSystemById,
          isDeleteSourceSystemByIdError,
          isDeleteSourceSystemByIdSuccess,
          refetchSourceSystem,
          isDeletePopUpOpen,
          setIsDeletePopUpOpen,
          systemId,
          setSystemId,
          deleteSourceSystemErrorDetails,
        }}
      >
        {children}
      </SystemOnboardingContext.Provider>
    </>
  );
};
