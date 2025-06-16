import { Button, Stepper, Tabs } from "eds-react";
import {
  EventFormProps,
  EventsManagementContext,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { EventManagementFirstStep } from "./steps/EventManagementFirstStep";
import { EventManagementSecondStep } from "./steps/EventManagementSecondStep";
import { EventManagementThirdStep } from "./steps/EventManagementThirdStep";
import { useTranslation } from "react-i18next";
import { useEventManagementForm } from "./useEventManagementForm";
import { EventManagementInitialValues } from "./types";
import { Context, useContext } from "react";

export const EventManagementForm: React.FC<EventFormProps> = ({
  mode,
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
    getValues,
    isEventParametersSuccess,
    register,
    selectedChannels,
    setSelectedChannels,
    reset,
    setValue,
    handleCancel,
  } = useEventManagementForm(mode, closeDrawer, initialValues);

  const {
    eventByIdData,
    refetchEventByIdData,
    isGetEventByIdDataError,
    isGetEventByIdDataSuccess,
    channelList,
    createEventError,
    createEventSuccess,
    refetchEventParameters,
  } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );

  const handleStepperSubmit = async () => {
    await handleSubmit(onSubmit)();
  };
  const formValues: EventManagementInitialValues =
    watch() as EventManagementInitialValues;
  const { t } = useTranslation();

  return (
    formValues &&
    (mode === "add" ? (
      <>
        <form className="flex flex-col h-screen ">
          <div className="flex-1 mt-2">
            <Stepper
              validateForm={trigger}
              onSubmit={handleStepperSubmit}
              drawerClose={closeDrawer}
              labelPosition="below"
              orientation="horizontal"
              submitAfterStep={2}
            >
              <Stepper.Step title={t("eventsManagement.details")}>
                <div className="flex flex-col h-full">
                  <EventManagementFirstStep
                    formValues={formValues}
                    control={control}
                    formState={formState}
                    mode={mode}
                    getValues={getValues}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step title={t("eventsManagement.configurations")}>
                <div className="flex flex-col h-full">
                  <EventManagementSecondStep
                    formValues={formValues}
                    control={control}
                    formState={formState}
                    mode={mode}
                    getValues={getValues}
                    isEventParametersSuccess={isEventParametersSuccess}
                    register={register}
                    channelList={channelList}
                    isGetEventByIdDataSuccess={isGetEventByIdDataSuccess}
                    refetchEventByIdData={refetchEventByIdData}
                    selectedChannels={selectedChannels}
                    setSelectedChannels={setSelectedChannels}
                    reset={reset}
                    setValue={setValue}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step title={t("eventsManagement.templates")}>
                <div className="flex flex-col h-full">
                  <EventManagementThirdStep
                    formValues={formValues}
                    control={control}
                    formState={formState}
                    mode={mode}
                    eventByIdData={eventByIdData || undefined}
                    refetchEventByIdData={refetchEventByIdData}
                    isGetEventByIdDataError={isGetEventByIdDataError}
                    isGetEventByIdDataSuccess={isGetEventByIdDataSuccess}
                    createEventError={createEventError}
                    createEventSuccess={createEventSuccess}
                  />
                </div>
              </Stepper.Step>
            </Stepper>
          </div>
        </form>
      </>
    ) : (
      <>
        <form className="flex flex-col h-screen ">
          <Tabs
            transparentTabs
            validateTabChange={trigger}
            preferredWidth="w-1/2"
            tabs={[
              {
                label: t("eventsManagement.details"),
                value: t("eventsManagement.details"),
                content: (
                  <EventManagementFirstStep
                    formValues={formValues}
                    control={control}
                    formState={formState}
                    mode={mode}
                    getValues={getValues}
                    initialValues={initialValues}
                  />
                ),
              },
              mode !== "view"
                ? {
                    label: t("eventsManagement.configurations"),
                    value: t("eventsManagement.configurations"),
                    content: (
                      <EventManagementSecondStep
                        formValues={formValues}
                        control={control}
                        formState={formState}
                        mode={mode}
                        getValues={getValues}
                        isEventParametersSuccess={isEventParametersSuccess}
                        register={register}
                        refetchEventParameters={refetchEventParameters}
                        channelList={channelList}
                        isGetEventByIdDataSuccess={isGetEventByIdDataSuccess}
                        refetchEventByIdData={refetchEventByIdData}
                        selectedChannels={selectedChannels}
                        setSelectedChannels={setSelectedChannels}
                        reset={reset}
                        setValue={setValue}
                        initialValues={initialValues}
                      />
                    ),
                  }
                : null,
              {
                label: t("eventsManagement.templates"),
                value: t("eventsManagement.templates"),
                content: (
                  <EventManagementThirdStep
                    formValues={formValues}
                    control={control}
                    formState={formState}
                    mode={mode}
                    eventByIdData={eventByIdData || undefined}
                    isGetEventByIdDataSuccess={isGetEventByIdDataSuccess}
                    isGetEventByIdDataError={isGetEventByIdDataError}
                    refetchEventByIdData={refetchEventByIdData}
                    createEventError={createEventError}
                    createEventSuccess={createEventSuccess}
                    initialValues={initialValues}
                  />
                ),
              },
            ].filter((tab) => tab !== null)}
          />
          <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
          <div className=" w-full flex justify-end gap-[20px] p-4">
            <Button
              size="large"
              onClick={handleCancel}
              label={t("eventsManagement.cancel")}
              type={"default"}
              state={"default"}
              buttonVariant="outlined"
            />
            {mode !== "view" ? (
              <Button
                size="large"
                onClick={async () => {
                  const isValid = await trigger();
                  isValid && handleSubmit(onSubmit)();
                }}
                label={t("eventsManagement.submit")}
                type={"default"}
                state={"default"}
              />
            ) : null}
          </div>
        </form>
      </>
    ))
  );
};
