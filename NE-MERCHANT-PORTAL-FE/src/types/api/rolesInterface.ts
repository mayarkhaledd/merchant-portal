import { ResponseInterface } from "./responseInterface";
export interface GetRolesPayload {
  roleStatus?: string;
}

export interface RoleInterface {
  roleCd: string;
  roleDesc: string;
  rolePermissions: string;
  Id: number;
  roleStatus: string;
}
export interface GetRolesResponse
  extends ResponseInterface<{
    roles: RoleInterface[];
  }> {}
