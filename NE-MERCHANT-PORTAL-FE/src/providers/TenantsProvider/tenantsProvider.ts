import { GetTenantsInterface, GetTenantsResponse } from "@ejada/types";
import { useCustomQuery } from "../useCustomQuery";
import { QueryConstant } from "@ejada/common";
import { TenantsService } from "@ejada/services";
import { adaptGetTenants } from "../adaptors/tenantsAdapter";

export function useGetTenants(enabled?: boolean) {
  return useCustomQuery<"", GetTenantsResponse, GetTenantsInterface>(
    QueryConstant.TENANTS,
    () => {
      return TenantsService.getTenants();
    },
    (data: GetTenantsResponse) => adaptGetTenants(data),
    enabled,
  );
}
