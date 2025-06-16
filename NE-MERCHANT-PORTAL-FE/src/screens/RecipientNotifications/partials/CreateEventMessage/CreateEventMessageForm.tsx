import React, { Context, useContext } from "react";
import { colors } from "@ejada/common";
import { CreateEventFirstStep } from "./Steps/CreateEventFirstStep";
import { CreateEventSecondStep } from "./Steps/CreateEventSecondStep";
import { Stepper } from "eds-react";
import {
  CreateEventMessageProps,
  CreateEventInitialValues,
  CreateEventMessageValues,
} from "@ejada/screens/RecipientNotifications/partials/CreateEventMessage";
import useCreateEventMessage from "./useCreateEventMessage";
import { t } from "i18next";
import { RecipientNotificationsContext } from "../../RecipientNotificationsProvider";
import { TRecipientNotificationsState } from "../../RecipientNotifications.types";
import { UseFormGetValues } from "react-hook-form";
interface CreateEventMessageEditProps extends CreateEventMessageProps {
  initialValues?: CreateEventInitialValues;
  getValues?: UseFormGetValues<CreateEventMessageValues> | undefined;
}

export const CreateEventMessage: React.FC<CreateEventMessageEditProps> = ({
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
  } = useCreateEventMessage(closeDrawer, initialValues);
  const handleStepperSubmit = async () => {
    await handleSubmit(onSubmit)();
  };
  const { eventParameters } = useContext<TRecipientNotificationsState>(
    RecipientNotificationsContext as Context<TRecipientNotificationsState>,
  );
  const formValues: CreateEventInitialValues =
    watch() as CreateEventInitialValues;
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
              <CreateEventFirstStep
                formValues={formValues}
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                getValues={getValues}
                eventParameters={eventParameters}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t("recipient_notifications.schedule_message")}>
            <div className="flex flex-col h-full">
              <CreateEventSecondStep
                formValues={formValues}
                control={control}
                formState={formState}
                getValues={getValues}
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
