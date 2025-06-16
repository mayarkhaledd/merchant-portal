import { SystemOnboardingInitialValues } from "@ejada/screens/SystemOnboarding";
import { TTableColumns } from "eds-react";
import { SelectSearchMenuList } from "@ejada/screens/SystemOnboarding/SystemOnboarding.constants";
import { Dispatch, SetStateAction } from "react";
import { deleteSourceSystemPayload } from "@ejada/types/api/systemInterface";
import { AxiosError } from "axios";

export type Tsystemstate = {
  isPopupOpen: boolean;
  setIsPopupOpen: (state: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  isEditDrawer: boolean;
  setIsEditDrawer: (state: boolean) => void;
  selectedSystem: SystemOnboardingInitialValues | undefined;
  setSelectedSystem: (value: SystemOnboardingInitialValues) => void;
  systemOnboardingTableData: TTableColumns[];
  choice: string;
  setChoice: (state: string) => void;
  sourceSystemsMenu: SelectSearchMenuList[] | undefined;
  setSourceSystemsMenu: Dispatch<
    SetStateAction<SelectSearchMenuList[] | undefined>
  >;

  deleteSourceSystemById: (data: deleteSourceSystemPayload) => void;
  isDeleteSourceSystemByIdSuccess: boolean;
  isDeleteSourceSystemByIdError: boolean;
  refetchSourceSystem: (() => void) | undefined;
  setIsDeletePopUpOpen: Dispatch<SetStateAction<boolean>>;
  isDeletePopUpOpen: boolean;
  systemId: number | undefined;
  setSystemId: Dispatch<SetStateAction<number | undefined>>;
  deleteSourceSystemErrorDetails: AxiosError | null;
};
