import { Drawer } from "eds-react";
import { useTranslation } from "react-i18next";
import { Context, useContext } from "react";
import { TWhatsappState } from "../../Whatsapp.types";
import { WhatsappContext } from "../../WhatsappProvider";
import { ContextPopup } from "@ejada/screens/shared/partials/PopUp/ContextPopup";
import { WhatsappFilterForm } from "../WhatsappFilterMenu/WhatsappFilterForm";
import {
  ErrorCode,
  getLocalizedErrorMessage,
  useErrorToast,
  useSuccessToast,
} from "@ejada/screens/shared";
import { AxiosError } from "axios";

export function WhatsappModals() {
  const { t } = useTranslation();
  const {
    isWhatsappFilterMenuOpen,
    setIsWhatsappFilterMenuOpen,
    whatsappTemplateId,
    setIsDeletePopUpOpen,
    isDeletePopUpOpen,
    deleteWhatsappTemplateById,
    setSearchQuery,
    activeSearchCriteria,
    setActiveSearchCriteria,
    isDeleteWhatsappTemplateByIdAxiosError,
    isDeleteWhatsappTemplateByIdSuccess,
    isCreateWhatsappTemplateSuccess,
    isCreateWhatsappTemplateError,
    isCreateWhatsappTemplateAxiosError,
    isUpdateWhatsappTemplateAxiosError,
    isUpdateWhatsappTemplateSuccess,
  } = useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);

  const successToast = useSuccessToast;
  const errorToast = useErrorToast;
  const handleSuccessToast = (condition: boolean, message: string) => {
    successToast(condition, t(message));
  };

  const handleErrorToast = (
    condition: boolean,
    message: string,
    errorDetail: AxiosError<unknown, unknown> | null | ErrorCode,
  ) => {
    errorToast(
      condition,
      t(message),
      getLocalizedErrorMessage(errorDetail, t(message) as string),
    );
  };
  // Handle success and error toasts
  const handleToasts = () => {
    const toastConfigs = [
      {
        condition: isDeleteWhatsappTemplateByIdSuccess,
        successMessage: "whatsapp.deleted_successfully",
        errorCondition:
          isDeleteWhatsappTemplateByIdAxiosError?.message !== undefined,
        errorMessage: "whatsapp.error",
        errorDetail: isDeleteWhatsappTemplateByIdAxiosError as ErrorCode,
      },
      {
        condition: isCreateWhatsappTemplateSuccess,
        successMessage: "whatsapp.create_whatsapp_template_success",
        errorCondition:
          isCreateWhatsappTemplateError ||
          isCreateWhatsappTemplateAxiosError?.message !== undefined,
        errorMessage: "whatsapp.error",
        errorDetail: isCreateWhatsappTemplateAxiosError as ErrorCode,
      },
      {
        condition: isUpdateWhatsappTemplateSuccess,
        successMessage: "whatsapp.update_whatsapp_template_success",
        errorCondition:
          isUpdateWhatsappTemplateAxiosError?.message !== undefined,
        errorMessage: "whatsapp.error",
        errorDetail: isUpdateWhatsappTemplateAxiosError as ErrorCode,
      },
    ];
    toastConfigs.forEach(
      ({
        condition,
        successMessage,
        errorCondition,
        errorMessage,
        errorDetail,
      }) => {
        handleSuccessToast(condition, successMessage);
        handleErrorToast(errorCondition, errorMessage, errorDetail);
      },
    );
  };

  handleToasts();

  return (
    <>
      {isDeletePopUpOpen && (
        <ContextPopup
          option={"deleteWhatsappTemplate"}
          id={whatsappTemplateId}
          onClose={() => {
            setIsDeletePopUpOpen(false);
          }}
          onConfirm={() => {
            deleteWhatsappTemplateById({
              templateId: whatsappTemplateId as string,
            });

            setIsDeletePopUpOpen(false);
          }}
        />
      )}
      <Drawer
        width="w-[630px]"
        isOpen={isWhatsappFilterMenuOpen}
        onOpenChange={setIsWhatsappFilterMenuOpen}
        drawerTitle={t("whatsapp.filter_menu.filter")}
      >
        <>
          <WhatsappFilterForm
            closeDrawer={() => setIsWhatsappFilterMenuOpen(false)}
            setSearchQuery={setSearchQuery}
            activeSearchCriteria={activeSearchCriteria}
            setActiveSearchCriteria={setActiveSearchCriteria}
          />
        </>
      </Drawer>
    </>
  );
}
