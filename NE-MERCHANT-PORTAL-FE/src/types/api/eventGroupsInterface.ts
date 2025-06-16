import { ResponseInterface } from "./responseInterface";

export interface GetEventGroupPayload {
  tenantId?: string;
  appTypeId?: number;
  descriptionAr?: string;
  descriptionEn?: string;
  eventGroupId?: string;
  eventGroupPushFlag?: string;
}

export interface GetEventGroupByIdPayload {
  id: string;
}
export interface CreateEventGroupPayload {
  eventGroupId: string | null;
  eventGroupDescriptionEn: string;
  eventGroupDescriptionAr: string;
  eventGroupPushFlag: string;
  appTypeId?: string;
}
export interface updateEventGroupPayload extends CreateEventGroupPayload {
  id: string;
}
export interface deleteEventGroupPayload {
  id: string;
}
export interface CreateEventGroupInterface {
  eventGroupId: string;
  eventGroupDescriptionEn: string;
}
export interface EventGroup {
  eventGroupId: string;
  eventGroupDescriptionEn: string;
  eventGroupDescriptionAr: string;
  eventGroupPushFlag: string;
  appTypeResponse: AppTypeResponse;
}
export interface GetEventGroupInterface {
  eventGroupList: EventGroup[];
}
export interface GetEventGroupsResponse
  extends ResponseInterface<GetEventGroupInterface> {}

export interface GetEventGroupByIdResponse
  extends ResponseInterface<EventGroup> {}
export interface CreateEventGroupResponse
  extends ResponseInterface<CreateEventGroupInterface> {}

export interface UpdateEventGroupResponse
  extends ResponseInterface<CreateEventGroupInterface> {}

export interface DeleteEventGroupResponse extends ResponseInterface<void> {}
export interface AppTypeResponse {
  appTypeId: number;
  appTypeName: string;
  active: boolean;
  tenantResponse: TenantResponse;
}

export interface TenantResponse {
  tenantId: string;
  tenantName: string;
}
