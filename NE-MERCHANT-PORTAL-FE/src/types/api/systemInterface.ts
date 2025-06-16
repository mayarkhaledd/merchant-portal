import { ResponseInterface } from "./responseInterface";
export interface GetSourceSystemInterface {
  appTypeList: CreateSourceSystemData[];
}
export interface CreateSourceSystemPayload {
  appTypeName: string;
  active: boolean;
  tenantId: string;
}
export interface CreateSourceSystemData {
  appTypeId: number;
  appTypeName: string;
  active: boolean;
  tenant: {
    tenantName: string;
    tenantId: string;
  };
}
export interface UpdateSourceSystemPayload extends CreateSourceSystemPayload {
  id: number;
}
export interface GetSourceSystemPayload {
  tenantId?: string;
}
export interface deleteSourceSystemPayload {
  id: string;
}
export interface GetSourceSystemResponse
  extends ResponseInterface<GetSourceSystemInterface> {}
export interface UpdateSourceSystemResponse
  extends ResponseInterface<CreateSourceSystemData> {}
export interface CreateSourceSystemResponse
  extends ResponseInterface<CreateSourceSystemData> {}

export interface DeleteSourceSystemResponse extends ResponseInterface<void> {}
