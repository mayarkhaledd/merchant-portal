import { GetTenantsInterface, GetTenantsResponse } from "@ejada/types";

export function adaptGetTenants(res: GetTenantsResponse): GetTenantsInterface {
  return {
    ...res.data,
  };
}
