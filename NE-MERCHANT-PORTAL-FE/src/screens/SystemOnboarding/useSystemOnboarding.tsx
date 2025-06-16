import { useEffect, useState } from "react";
import { SystemOnboardingInitialValues } from "@ejada/screens/SystemOnboarding";
import {
  useDeleteSourceSystemById,
  useGetSystems,
} from "@ejada/providers/systemProvider/systemProvider";
import { TTableColumns } from "eds-react";
import { mapSystemDataToTable } from "./Partials/utils";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";
import { formatToSelectKeyNode } from "@ejada/screens/shared";
import { SelectSearchMenuList } from "@ejada/screens/SystemOnboarding/SystemOnboarding.constants";

export function useSystemOnboarding() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(
    Cookies.get(HTTPCookies.appTypeId) ? false : true,
  );
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isEditDrawer, setIsEditDrawer] = useState<boolean>(false);
  const [selectedSystem, setSelectedSystem] =
    useState<SystemOnboardingInitialValues>();
  const [choice, setChoice] = useState("");
  const [systemId, setSystemId] = useState<number>();
  const [sourceSystemsMenu, setSourceSystemsMenu] =
    useState<SelectSearchMenuList[]>();
  const [systemOnboardingTableData, setSystemOnboardingTableData] = useState<
    TTableColumns[]
  >([]);
  const {
    mutate: deleteSourceSystemById,
    isSuccess: isDeleteSourceSystemByIdSuccess,
    isError: isDeleteSourceSystemByIdError,
    error: deleteSourceSystemErrorDetails,
  } = useDeleteSourceSystemById();
  const {
    updatedData: systemOnboardingData,
    isSuccess: isSystemOnboardingSuccess,
    refetch: refetchSourceSystem,
  } = useGetSystems(
    {
      tenantId: Cookies.get("tenantId")
        ? (Cookies.get("tenantId") as string)
        : "",
    },
    true,
  );
  useEffect(() => {
    if (isDeleteSourceSystemByIdSuccess && refetchSourceSystem) {
      refetchSourceSystem();
    }
  }, [isDeleteSourceSystemByIdSuccess, refetchSourceSystem]);
  useEffect(() => {
    if (systemOnboardingData && systemOnboardingData.appTypeList.length) {
      setSystemOnboardingTableData(mapSystemDataToTable(systemOnboardingData));
    }
  }, [systemOnboardingData]);

  const { updatedData: sourceSystemData, refetch: refetchAppType } =
    useGetSystems(
      {
        tenantId: Cookies.get("tenantId")
          ? (Cookies.get("tenantId") as string)
          : " ",
      },
      true,
    );
  useEffect(() => {
    if (choice && refetchAppType) {
      Cookies.set(HTTPCookies.appTypeId, choice);
      refetchAppType();
    }
  }, [choice]);
  useEffect(() => {
    if (sourceSystemData && sourceSystemData.appTypeList) {
      const systemMenu = formatToSelectKeyNode(
        sourceSystemData.appTypeList,
        "appTypeId",
        "appTypeName",
      );
      setSourceSystemsMenu(systemMenu);
    }
  }, [sourceSystemData]);
  return {
    isPopupOpen,
    setIsPopupOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isEditDrawer,
    setIsEditDrawer,
    selectedSystem,
    setSelectedSystem,
    systemOnboardingTableData,
    isSystemOnboardingSuccess,
    choice,
    setChoice,
    sourceSystemsMenu,
    setSourceSystemsMenu,
    isDeleteSourceSystemByIdError,
    isDeleteSourceSystemByIdSuccess,
    deleteSourceSystemById,
    refetchSourceSystem,
    setIsDeletePopUpOpen,
    isDeletePopUpOpen,
    systemId,
    setSystemId,
    deleteSourceSystemErrorDetails,
  };
}
