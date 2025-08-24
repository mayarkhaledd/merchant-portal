import { QueryConstant } from "@ejada/common";
import { useCustomQuery } from "../useCustomQuery";
import { EmailTemplatesService } from "@ejada/services/email.service";
import {
  CreateEmailTemplatePayload,
  CreateEmailTemplateResponse,
  GetEmailTemplateInterface,
  GetEmailTemplatePayload,
  GetEmailTemplatesResponse,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplatePayload,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplatePayload,
  ToggleEmailTemplateStatusPayload,
  ToggleEmailTemplateStatusResponse,
} from "@ejada/types/api/emailInterface";
import {
  adaptCreateEmailTemplate,
  adaptUpdateEmailTemplate,
  adaptGetEmailTemplates,
  adaptToggleEmailTemplateStatus,
} from "../adaptors/emailTemplatesAdaptor";
import { useCustomMutation } from "../useCustomMutation";

export function useGetEmailTemplates(
  data: GetEmailTemplatePayload,
  enabled?: boolean,
) {
  return useCustomQuery<
    GetEmailTemplatePayload,
    GetEmailTemplatesResponse,
    GetEmailTemplateInterface
  >(
    QueryConstant.EMAIL_TEMPLATES,
    () => {
      return EmailTemplatesService.getEmailTemplates(data);
    },
    (data: GetEmailTemplatesResponse) => adaptGetEmailTemplates(data),
    enabled,
  );
}

export function useCreateEmailTemplate() {
  const onSuccess = (res: CreateEmailTemplateResponse) => {
    const updatedData = adaptCreateEmailTemplate(res);
    return updatedData;
  };

  return useCustomMutation<
    CreateEmailTemplatePayload,
    CreateEmailTemplateResponse
  >((data: CreateEmailTemplatePayload) => {
    return EmailTemplatesService.createEmailTemplate(data);
  }, onSuccess);
}

export function useUpdateEmailTemplate() {
  const onSuccess = (res: UpdateEmailTemplateResponse) => {
    const updatedData = adaptUpdateEmailTemplate(res);
    return updatedData;
  };

  return useCustomMutation<
    UpdateEmailTemplatePayload,
    UpdateEmailTemplateResponse
  >((data: UpdateEmailTemplatePayload) => {
    return EmailTemplatesService.updateEmailTemplate(data);
  }, onSuccess);
}

export function useToggleEmailTemplateStatus() {
  const onSuccess = (res: ToggleEmailTemplateStatusResponse) => {
    const updatedData = adaptToggleEmailTemplateStatus(res);
    return updatedData;
  };

  return useCustomMutation<
    ToggleEmailTemplateStatusPayload,
    ToggleEmailTemplateStatusResponse
  >((data: ToggleEmailTemplateStatusPayload) => {
    return EmailTemplatesService.toggleEmailTemplateStatus(data);
  }, onSuccess);
}

export function useDeleteEmailTemplateById() {
  const onSuccess = (res: DeleteEmailTemplateResponse) => {
    const updatedData = res;
    return updatedData;
  };

  return useCustomMutation<
    DeleteEmailTemplatePayload,
    DeleteEmailTemplateResponse
  >((data: DeleteEmailTemplatePayload) => {
    return EmailTemplatesService.deleteEmailTemplateById(data);
  }, onSuccess);
}
