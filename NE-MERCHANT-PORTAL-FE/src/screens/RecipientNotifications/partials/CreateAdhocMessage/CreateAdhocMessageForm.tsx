import React from "react";
import { colors } from "@ejada/common";
import { CreateAdhocFirstStep } from "./Steps/CreateAdhocFirstStep";
import { CreateAdhocSecondStep } from "./Steps/CreateAdhocSecondStep";
import { CreateAdhocThirdStep } from "./Steps/CreateAdhocThirdStep";
import { Stepper } from "eds-react";
import {
  CreateAdhocMessageProps,
  CreateAdhocInitialValues,
} from "@ejada/screens/RecipientNotifications";
import useCreateAdhocMessage from "./useCreateAdhocMessage";
import { t } from "i18next";

interface CreateAdhocMessageEditProps extends CreateAdhocMessageProps {
  initialValues?: CreateAdhocInitialValues;
}

export const CreateAdhocMessage: React.FC<CreateAdhocMessageEditProps> = ({
  closeDrawer,
  initialValues,
}) => {
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    trigger,
    watch,
    setValue,
    getValues,
  } = useCreateAdhocMessage(closeDrawer, initialValues);
  const handleStepperSubmit = async () => {
    await handleSubmit(onSubmit)();
  };
  const formValues: CreateAdhocInitialValues =
    watch() as CreateAdhocInitialValues;
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
          <Stepper.Step title={t("recipient_notifications.recipient_details")}>
            <div className="flex flex-col h-full">
              <CreateAdhocFirstStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                getValues={getValues}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t("recipient_notifications.message_details")}>
            <div className="flex flex-col h-full">
              <CreateAdhocSecondStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t("recipient_notifications.schedule_message")}>
            <div className="flex flex-col h-full">
              <CreateAdhocThirdStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
              />
            </div>
          </Stepper.Step>
        </Stepper>
      </div>
    </form>
  );
};
