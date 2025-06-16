import { TTableColumns } from "eds-react";
import { SystemOnboardingInitialValues } from "./AddSourceSystem/AddSourceSystemForm.types";
import { GetSourceSystemInterface } from "@ejada/types/api/systemInterface";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";

export function mapSystemToPayload(data: SystemOnboardingInitialValues) {
  return {
    appTypeName: data.sourceSystemName,
    active: data.status === "A",
    tenantId: Cookies.get(HTTPCookies.tenantId) as string,
  };
}
export function mapSystemToUpdatePayload(data: SystemOnboardingInitialValues) {
  return {
    appTypeName: data.sourceSystemName,
    active: data.status === "A",
    tenantId: Cookies.get(HTTPCookies.tenantId) as string,
    id: data.sourceSystemId,
  };
}

export function mapSystemDataToTable(
  data: GetSourceSystemInterface,
): TTableColumns[] {
  return data.appTypeList.map((item) => {
    return {
      sourceSystemId: item.appTypeId,
      sourceSystemName: item.appTypeName,
      status: item.active ? "A" : "I",
    };
  });
}
