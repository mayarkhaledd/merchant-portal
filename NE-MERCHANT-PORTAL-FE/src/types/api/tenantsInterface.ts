import { ResponseInterface } from "./responseInterface";

export interface Tenants {
  tenantName: string;
  tenantId: string;
}

export interface TenantsInterface {
  tenants: Tenants[];
}
export interface GetTenantsInterface {
  tenants: TenantsInterface;
}

export interface GetTenantsResponse
  extends ResponseInterface<GetTenantsInterface> {}
