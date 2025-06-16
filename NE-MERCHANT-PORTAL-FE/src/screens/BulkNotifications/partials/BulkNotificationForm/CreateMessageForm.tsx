import React from "react";
import { colors } from "@ejada/common";
import { BulkNotificationFirstStep } from "./Steps/BulkNotificationFirstStep";
import { BulkNotificationSecondStep } from "./Steps/BulkNotificationSecondStep";
import { BulkNotificationThirdStep } from "./Steps/BulkNotificationThirdStep";
import { Stepper } from "eds-react";
import { CreateAdhocMessageProps } from ".";
import { BulkNotificationInitialValues } from "@ejada/screens/BulkNotifications";
import { useCreateMessageForm } from "./useCreateMessageForm";
import { t } from "i18next";
type Mode = "adhoc" | "event";

interface CreateAdhocMessageEditProps extends CreateAdhocMessageProps {
  mode: Mode;
  initialValues?: BulkNotificationInitialValues;
}

export const CreateMessageForm: React.FC<CreateAdhocMessageEditProps> = ({
  closeDrawer,
  mode,
  initialValues,
}) => {
  const { control, handleSubmit, formState, onSubmit, trigger, watch } =
    useCreateMessageForm(closeDrawer, mode, initialValues);

  const handleStepperSubmit = async () => {
    await handleSubmit(onSubmit)();
  };
  const formValues: BulkNotificationInitialValues =
    watch() as BulkNotificationInitialValues;
  return (
    <form className="flex flex-col h-screen ">
      <div className="flex-1 ">
        <Stepper
          validateForm={trigger}
          onSubmit={handleStepperSubmit}
          drawerClose={closeDrawer}
          labelPosition="below"
          orientation="horizontal"
        >
          <Stepper.Step title={t("bulk-notifications.recipient_details")}>
            <div className="flex flex-col h-full">
              <BulkNotificationFirstStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                mode={mode}
                watch={watch}
              />
            </div>
          </Stepper.Step>
          {mode !== "event" && (
            <Stepper.Step title={t("bulk-notifications.message_details")}>
              <div className="flex flex-col h-full">
                <BulkNotificationSecondStep
                  formValues={formValues}
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  mode={mode}
                />
              </div>
            </Stepper.Step>
          )}
          <Stepper.Step title={t("bulk-notifications.schedule_message")}>
            <div className="flex flex-col h-full">
              <BulkNotificationThirdStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                mode={mode}
              />
            </div>
          </Stepper.Step>
        </Stepper>
      </div>
    </form>
  );
};
