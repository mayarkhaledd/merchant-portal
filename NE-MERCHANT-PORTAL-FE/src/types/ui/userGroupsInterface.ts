export interface Group {
  groupDesc: string;
  rolesList: string;
  groupStatus: string;
  id: number;
  groupCd: string;
}
export interface GetUserGroupsInterface {
  status?: number;
  data: Group[];
}
