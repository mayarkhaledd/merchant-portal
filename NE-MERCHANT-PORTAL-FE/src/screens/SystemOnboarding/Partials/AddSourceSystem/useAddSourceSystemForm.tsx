import { useForm } from "react-hook-form";
import {
  AddSourceSystemFormValues,
  SystemOnboardingInitialValues,
} from "./AddSourceSystemForm.types";
import {
  useCreateSystem,
  useUpdateSystem,
} from "@ejada/providers/systemProvider/systemProvider";
import { mapSystemToPayload, mapSystemToUpdatePayload } from "../utils";
import { toast } from "react-toastify";
import { Notification } from "eds-react";
import i18n from "@ejada/common/locals/i18n";
import { Context, useContext } from "react";
import {
  getLocalizedErrorMessage,
  SystemOnboardingContext,
  Tsystemstate,
} from "@ejada/screens";
import { AxiosError } from "axios";

type Mode = "create" | "edit";
export const useAddSourceSystemForm = (
  closeDrawer: () => void,
  mode: Mode,
  initialValues?: SystemOnboardingInitialValues,
) => {
  const { mutate: CreateSystem } = useCreateSystem();
  const { mutate: UpdateSystem } = useUpdateSystem();
  const { refetchSourceSystem } = useContext<Tsystemstate>(
    SystemOnboardingContext as Context<Tsystemstate>,
  );
  const { control, handleSubmit, formState, reset, trigger, watch } =
    useForm<AddSourceSystemFormValues>({
      mode: "onTouched",
      defaultValues: initialValues,
    });

  const onSubmit = (data: AddSourceSystemFormValues) => {
    try {
      if (mode === "create") {
        const payload = mapSystemToPayload(data);
        // @ts-expect-error Expected 1 arguments, but got 2.
        CreateSystem(payload, {
          onSuccess: () => {
            if (refetchSourceSystem) refetchSourceSystem();
            toast.dark(
              <Notification
                title={
                  i18n.t(
                    "system-onboarding.add_source_system_success",
                  ) as string
                }
                option="success"
              />,
            );
            closeDrawer();
          },
          onError: (error: AxiosError) => {
            closeDrawer();
            toast.dark(
              <Notification
                title={
                  i18n.t("system-onboarding.something_went_wrong") as string
                }
                body={getLocalizedErrorMessage(
                  error,
                  i18n.t("eventsManagement.Unknown_Error") as string,
                )}
                option="fail"
              />,
            );
          },
        });
      } else if (mode === "edit") {
        const payload = mapSystemToUpdatePayload(data);
        // @ts-expect-error Expected 1 arguments, but got 2.
        UpdateSystem(payload, {
          onSuccess: () => {
            if (refetchSourceSystem) refetchSourceSystem();
            toast.dark(
              <Notification
                title={
                  i18n.t(
                    "system-onboarding.edit_source_system_success",
                  ) as string
                }
                option="success"
              />,
            );
            closeDrawer();
          },
          onError: (error: AxiosError) => {
            closeDrawer();
            toast.dark(
              <Notification
                title={
                  i18n.t("system-onboarding.something_went_wrong") as string
                }
                body={getLocalizedErrorMessage(
                  error,
                  i18n.t("eventsManagement.Unknown_Error") as string,
                )}
                option="fail"
              />,
            );
          },
        });
      }
    } catch (error) {
      toast.dark(
        <Notification
          title={i18n.t("system-onboarding.something_went_wrong") as string}
          option="fail"
        />,
      );
    }
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
  };

  return {
    control,
    handleSubmit,
    formState,
    handleCancel,
    onSubmit,
    trigger,
    watch,
  };
};
