import { Context, useContext } from "react";
import { Tsystemstate } from "@ejada/screens/SystemOnboarding/SystemonBoarding.types";
import { SystemOnboardingContext } from "@ejada/screens/SystemOnboarding/SystemOnboaringProvider";
import {
  getLocalizedErrorMessage,
  SystemOnboardingPopup,
} from "@ejada/screens/shared";
import { Drawer } from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { AddSourceSystemForm } from "../AddSourceSystem/AddSourceSystemForm";
import { ContextPopup } from "@ejada/screens/shared/partials/PopUp/ContextPopup";
import { useErrorToast, useSuccessToast } from "@ejada/screens/shared";
export function SystemOnboardingModals() {
  const {
    isPopupOpen,
    setIsPopupOpen,
    setIsDrawerOpen,
    isDrawerOpen,
    isEditDrawer,
    setIsEditDrawer,
    selectedSystem,
    sourceSystemsMenu,
    isDeletePopUpOpen,
    setIsDeletePopUpOpen,
    systemId,
    //isDeleteSourceSystemByIdError,
    isDeleteSourceSystemByIdSuccess,
    deleteSourceSystemById,
    deleteSourceSystemErrorDetails,
  } = useContext<Tsystemstate>(
    SystemOnboardingContext as Context<Tsystemstate>,
  );
  useSuccessToast(
    isDeleteSourceSystemByIdSuccess,
    i18n.t("system-onboarding.deleted_succefully") as string,
  );

  useErrorToast(
    deleteSourceSystemErrorDetails?.message !== undefined,
    i18n.t("system-onboarding.error_delete") as string,
    getLocalizedErrorMessage(
      deleteSourceSystemErrorDetails,
      i18n.t("eventsManagement.Unknown_Error") as string,
    ),
  );
  return (
    <>
      <div className="mt-[24px] w-full">
        {isDeletePopUpOpen && (
          <ContextPopup
            option={"deleteSourceSystem"}
            id={systemId?.toString() as string}
            onClose={() => {
              setIsDeletePopUpOpen(false);
            }}
            onConfirm={() => {
              deleteSourceSystemById({
                id: systemId?.toString() as string,
              });

              setIsDeletePopUpOpen(false);
            }}
          />
        )}
        {isPopupOpen && (
          <SystemOnboardingPopup
            onClose={() => setIsPopupOpen(false)}
            sourceSystemOptions={sourceSystemsMenu ? sourceSystemsMenu : []}
          />
        )}
        <Drawer
          width="w-[740px]"
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          drawerTitle={
            i18n.t("system-onboarding.add_new_source_system") as string
          }
        >
          <AddSourceSystemForm
            closeDrawer={() => setIsDrawerOpen(false)}
            mode="create"
          />
        </Drawer>
      </div>
      <Drawer
        width="w-[740px]"
        isOpen={isEditDrawer}
        onOpenChange={setIsEditDrawer}
        drawerTitle={i18n.t("system-onboarding.edit_source_system") as string}
      >
        <AddSourceSystemForm
          closeDrawer={() => setIsEditDrawer(false)}
          mode="edit"
          initialValues={selectedSystem}
        />
      </Drawer>{" "}
    </>
  );
}
