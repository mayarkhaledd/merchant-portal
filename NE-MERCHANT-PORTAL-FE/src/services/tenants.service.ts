import { GetTenantsResponse } from "@ejada/types";
import httpClient from "./httpClient";
import { API } from "@ejada/common";

export const TenantsService = {
  getTenants: async (): Promise<GetTenantsResponse> => {
    const response = await httpClient.get(API.tenants);
    return {
      ...response.data,
    };
  },
};
