import {
  NotificationRequestPayload,
  NotificationRequestResponse,
} from "@ejada/types/api/recipientInterface";
import { useCustomMutation } from "@ejada/providers";
import { recipientService } from "@ejada/services/recipient.service";
import { adaptNotificaionRequest } from "@ejada/providers/adaptors/recipientAdaptor";

export function useNotificaitonRequest() {
  const onSuccess = (res: NotificationRequestResponse) => {
    const updatedData = adaptNotificaionRequest(res);
    return updatedData;
  };
  return useCustomMutation<
    NotificationRequestPayload,
    NotificationRequestResponse
  >((data: NotificationRequestPayload) => {
    return recipientService.CreateNotificationRequest(data);
  }, onSuccess);
}
