import { ResponseInterface } from "./responseInterface";

export interface RolesList {
  roleId: number;
}

export interface GetUserGroupsPayload {
  groupStatus?: string;
}
export interface GetUserGroupsResponse
  extends ResponseInterface<{
    Groups: {
      groupDesc: string;
      rolesList: string;
      groupStatus: string;
      id: number;
      groupCd: string;
    }[];
  }> {}

export interface CreateNewGroupPayload {
  groupCd: string;
  groupDesc: string;
  rolesList: RolesList[];
}
export interface UpdateGroupPayload {
  groupCd: string;
  groupDesc: string;
  rolesList: RolesList[];
}

export interface Data {}

export interface Header {
  requestId: string;
  status: Status;
}

export interface Status {
  code: string;
  details: string;
  subErrors: SubError[];
}

export interface SubError {
  code: string;
  details: string;
}

export interface CreateNewGroupResponse {
  data: Data;
  header: Header;
}
export interface UpdateGroupResponseData {
  GroupRequestId: number;
}
export interface UpdateGroupResponse {
  data: UpdateGroupResponseData;
  header: Header;
}
export interface AddUsersToGroupPayload {
  userIds: string[];
  groupCd: string;
}
export interface AddUsersToGroupResponse {
  header: Header;
}
