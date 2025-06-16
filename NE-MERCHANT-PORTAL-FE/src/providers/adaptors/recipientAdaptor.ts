import { NotificationRequestResponse } from "@ejada/types/api/recipientInterface";

export function adaptNotificaionRequest(res: NotificationRequestResponse) {
  return {
    ...res.data,
    status: res.status,
  };
}
