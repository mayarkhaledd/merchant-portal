import { useEffect, useState } from "react";
import {
  useCreateEmailTemplate,
  useDeleteEmailTemplateById,
  useGetEmailTemplates,
  useUpdateEmailTemplate,
  useToggleEmailTemplateStatus,
} from "@ejada/providers/emailProvider";
import { emailConstants } from "./Email.constants";
import {
  GetEmailTemplatePayload,
  EmailTemplate,
  CreateEmailTemplatePayload,
  UpdateEmailTemplatePayload,
} from "@ejada/types/api/emailInterface";
import Cookies from "js-cookie";
import i18n from "@ejada/common/locals/i18n";
import { getLocalizedErrorMessage, useErrorToast } from "../shared";
import { useSuccessToast } from "../shared"; // Adjust the import path as needed

export const useEmailBuilder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(
    null,
  );
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [initialTemplate, setInitialTemplate] = useState<string>("");
  const [selectedTemplateDocument, setSelectedTemplateDocument] =
    useState<any>(null);
  const [selectedRawJson, setSelectedRawJson] = useState<any>(null);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<
    Partial<GetEmailTemplatePayload>
  >({});
  const [searchQuery, setSearchQuery] = useState<
    Partial<GetEmailTemplatePayload>
  >({});
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState<boolean>(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  const emailTemplatePayload = {
    tenantId: Cookies.get("tenantId")
      ? (Cookies.get("tenantId") as string)
      : "",
    ...searchQuery,
  };
  const {
    updatedData: emailTemplatesData,
    isSuccess: isEmailTemplatesSuccess,
    isError: isEmailTemplatesError,
    refetch: refetchEmailTemplates,
    isLoading: isGetEmailTemplatesLoading,
  } = useGetEmailTemplates(emailTemplatePayload);

  const {
    mutate: createEmailTemplateMutation,
    isSuccess: isCreateEmailTemplateSuccess,
    isError: isCreateEmailTemplateError,
    error: createEmailTemplateAxiosError,
    isPending: isCreatingTemplate,
  } = useCreateEmailTemplate();

  const {
    mutate: updateEmailTemplateMutation,
    isSuccess: isUpdateEmailTemplateSuccess,
    isError: isUpdateEmailTemplateError,
    error: updateEmailTemplateAxiosError,
    isPending: isUpdatingTemplate,
  } = useUpdateEmailTemplate();

  const {
    mutate: deleteEmailTemplateMutation,
    isSuccess: isDeleteEmailTemplateSuccess,
    isError: isDeleteEmailTemplateError,
    error: deleteEmailTemplateAxiosError,
    isPending: isDeletingTemplate,
  } = useDeleteEmailTemplateById();

  const {
    mutate: toggleEmailTemplateStatusMutation,
    isSuccess: isToggleEmailTemplateStatusSuccess,
    isError: isToggleEmailTemplateStatusError,
    error: toggleEmailTemplateStatusAxiosError,
    isPending: isTogglingStatus,
  } = useToggleEmailTemplateStatus();

  // Update templates when data is fetched
  useEffect(() => {
    if (emailTemplatesData && isEmailTemplatesSuccess) {
      setTemplates(emailTemplatesData.templates || []);
      setIsLoading(false);
    }
  }, [emailTemplatesData, isEmailTemplatesSuccess]);

  // Handle loading state
  useEffect(() => {
    setIsLoading(isGetEmailTemplatesLoading);
  }, [isGetEmailTemplatesLoading]);

  // Success toast handlers
  useSuccessToast(
    isCreateEmailTemplateSuccess,
    i18n.t("email.template_created_successfully") as string,
  );

  useSuccessToast(
    isUpdateEmailTemplateSuccess,
    i18n.t("email.template_updated_successfully") as string,
  );

  useSuccessToast(
    isDeleteEmailTemplateSuccess,
    i18n.t("email.template_deleted_successfully") as string,
  );

  useSuccessToast(
    isToggleEmailTemplateStatusSuccess,
    i18n.t("email.template_status_updated_successfully") as string,
  );

  // Error toast handlers
  useErrorToast(
    isCreateEmailTemplateError,
    i18n.t("email.error_creating_template") as string,
    getLocalizedErrorMessage(
      createEmailTemplateAxiosError?.message,
      i18n.t("email.error_creating_template") as string,
    ),
  );

  useErrorToast(
    isUpdateEmailTemplateError,
    i18n.t("email.error_updating_template") as string,
    getLocalizedErrorMessage(
      updateEmailTemplateAxiosError?.message,
      i18n.t("email.error_updating_template") as string,
    ),
  );

  useErrorToast(
    isDeleteEmailTemplateError,
    i18n.t("email.error_deleting_template") as string,
    getLocalizedErrorMessage(
      deleteEmailTemplateAxiosError?.message,
      i18n.t("email.error_deleting_template") as string,
    ),
  );

  useErrorToast(
    isToggleEmailTemplateStatusError,
    i18n.t("email.error_updating_template_status") as string,
    getLocalizedErrorMessage(
      toggleEmailTemplateStatusAxiosError?.message,
      i18n.t("email.error_updating_template_status") as string,
    ),
  );

  // Side effects for successful operations that need additional actions
  useEffect(() => {
    if (
      isCreateEmailTemplateSuccess ||
      isDeleteEmailTemplateSuccess ||
      isToggleEmailTemplateStatusSuccess
    ) {
      refetchEmailTemplates?.();
    }
  }, [
    isCreateEmailTemplateSuccess,
    isDeleteEmailTemplateSuccess,
    isToggleEmailTemplateStatusSuccess,
    refetchEmailTemplates,
  ]);

  useEffect(() => {
    if (isUpdateEmailTemplateSuccess) {
      refetchEmailTemplates?.();
      setEditingTemplate(null);
    }
  }, [isUpdateEmailTemplateSuccess, refetchEmailTemplates]);

  // API Methods to be called when needed
  const createEmailTemplate = async (templateData: {
    name: string;
    html: string;
    documentData: any;
    thumbnail?: string;
  }) => {
    try {
      const payload: CreateEmailTemplatePayload = {
        tenantId: Cookies.get("tenantId") as string,
        templateName: templateData.name,
        htmlContent: templateData.html,
        documentData: JSON.stringify(templateData.documentData),
        thumbnail: templateData.thumbnail,
        enabledFlag: emailConstants.y,
        language: emailConstants.en,
      };

      createEmailTemplateMutation(payload);
    } catch (error) {
      console.error("Error creating email template:", error);
      throw error;
    }
  };

  const updateEmailTemplate = async (
    templateId: number,
    templateData: {
      name: string;
      html: string;
      documentData: any;
      thumbnail?: string;
    },
  ) => {
    try {
      const payload: UpdateEmailTemplatePayload = {
        emailTemplateId: templateId,
        tenantId: Cookies.get("tenantId") as string,
        templateName: templateData.name,
        htmlContent: templateData.html,
        documentData: JSON.stringify(templateData.documentData),
        thumbnail: templateData.thumbnail,
        enabledFlag: emailConstants.y,
        language: emailConstants.en,
      };

      updateEmailTemplateMutation(payload);
    } catch (error) {
      console.error("Error updating email template:", error);
      throw error;
    }
  };

  const deleteEmailTemplate = async (templateId: number) => {
    try {
      deleteEmailTemplateMutation({ emailTemplateId: templateId });
    } catch (error) {
      console.error("Error deleting email template:", error);
      throw error;
    }
  };

  const toggleEmailTemplateStatus = async (
    templateId: number,
    currentStatus: string,
  ) => {
    try {
      const newStatus =
        currentStatus === emailConstants.y
          ? emailConstants.n
          : emailConstants.y;
      toggleEmailTemplateStatusMutation({
        emailTemplateId: templateId,
        enabledFlag: newStatus,
      });
    } catch (error) {
      console.error("Error toggling email template status:", error);
      throw error;
    }
  };

  // Get email template by ID using the list API with filter
  // const getEmailTemplateById = async (
  //   templateId: number,
  // ): Promise<EmailTemplate | null> => {
  //   try {
  //     // First check if template exists in current templates array
  //     const existingTemplate = templates.find(
  //       (template) => template.id === templateId,
  //     );
  //     if (existingTemplate) {
  //       return existingTemplate;
  //     }

  //     // If not found in current list, fetch with templateId filter
  //     await refetchEmailTemplates?.();
  //     if (emailTemplatesData?.templates) {
  //       const foundTemplate = emailTemplatesData.templates.find(
  //         (template: EmailTemplate) => template.id === templateId,
  //       );
  //       return foundTemplate || null;
  //     }

  //     return null;
  //   } catch (error) {
  //     console.error("Error fetching email template by ID:", error);
  //     throw error;
  //   }
  // };

  // Helper methods
  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
  };

  const clearEditingTemplate = () => {
    setEditingTemplate(null);
  };

  // Delete template with popup confirmation
  const handleDeleteTemplate = (templateId: number) => {
    setTemplateToDelete(templateId);
    setIsDeletePopUpOpen(true);
  };

  const confirmDeleteTemplate = async () => {
    if (templateToDelete) {
      try {
        await deleteEmailTemplate(templateToDelete);
      } catch (error) {
        console.error("Error deleting template:", error);
      } finally {
        setIsDeletePopUpOpen(false);
        setTemplateToDelete(null);
      }
    }
  };

  const cancelDeleteTemplate = () => {
    setIsDeletePopUpOpen(false);
    setTemplateToDelete(null);
  };

  // Search functionality
  const handleSearch = (searchCriteria: Partial<GetEmailTemplatePayload>) => {
    setSearchQuery(searchCriteria);
  };

  const clearSearch = () => {
    setSearchQuery({});
  };

  // Find template by ID in current templates
  // const findTemplateById = (templateId: number): EmailTemplate | null => {
  //   return templates.find((template) => template.id === templateId) || null;
  // };

  return {
    // Data
    templates,
    setTemplates,
    editingTemplate,
    setEditingTemplate,
    emailTemplatesData,

    // UI States
    isLoading,
    setIsLoading,

    // Builder States
    // selectedTemplate,
    // setSelectedTemplate,
    isBuilderOpen,
    setIsBuilderOpen,
    templateName,
    setTemplateName,
    initialTemplate,
    setInitialTemplate,

    // Loading states for operations
    isCreatingTemplate,
    isUpdatingTemplate,
    isDeletingTemplate,
    isTogglingStatus,

    // Success states
    isCreateEmailTemplateSuccess,
    isUpdateEmailTemplateSuccess,
    isDeleteEmailTemplateSuccess,
    isToggleEmailTemplateStatusSuccess,

    // Error states
    isCreateEmailTemplateError,
    isUpdateEmailTemplateError,
    isDeleteEmailTemplateError,
    isToggleEmailTemplateStatusError,
    isEmailTemplatesError,
    createEmailTemplateAxiosError,
    updateEmailTemplateAxiosError,
    deleteEmailTemplateAxiosError,
    toggleEmailTemplateStatusAxiosError,

    // API Methods
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    toggleEmailTemplateStatus,
    //getEmailTemplateById,
    //findTemplateById,

    // Helper methods
    handleEditTemplate,
    clearEditingTemplate,
    handleDeleteTemplate,
    confirmDeleteTemplate,
    cancelDeleteTemplate,

    // Delete popup state
    isDeletePopUpOpen,
    setIsDeletePopUpOpen,
    templateToDelete,

    // Search functionality
    searchQuery,
    setSearchQuery,
    handleSearch,
    clearSearch,

    // Refetch methods
    refetchEmailTemplates,

    // Additional States
    selectedTemplateDocument,
    setSelectedTemplateDocument,
    selectedRawJson,
    setSelectedRawJson,
    activeSearchCriteria,
    setActiveSearchCriteria,
  };
};
