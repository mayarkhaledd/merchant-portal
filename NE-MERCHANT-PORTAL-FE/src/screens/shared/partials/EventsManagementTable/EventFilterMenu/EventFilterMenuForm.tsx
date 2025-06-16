import { Button } from "eds-react";
import { EventFilterMenuFormProps } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenu.types";
import useEventFilterMenuForm from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/useEventFilterMenuForm";
import { EventCode } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuItems/EventCode";
import { Status } from "./EventFilterMenuItems/Status";
import { EventEnglishDescription } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuItems/EventEnglishDescription";
import { EventArabicDescription } from "@ejada/screens/shared/partials/EventsManagementTable/EventFilterMenu/EventFilterMenuItems/EventArabicDescription";
import { EventManagementTableProps } from "../EventManagementTableTypes";
import { EventGroup } from "./EventFilterMenuItems/EventGroup";
import { SourceSystem } from "./EventFilterMenuItems/SourceSystem";
import i18n from "@ejada/common/locals/i18n";
export const EventFilterMenuForm = ({
  closeDrawer,
  setSearchQuery,
  //isSendNotificationFilter,
  activeSearchCriteria,
  setActiveSearchCriteria,
  setIsButtonText,
}: EventFilterMenuFormProps & EventManagementTableProps) => {
  const {
    handleCancel,
    handleClear,
    formState,
    watch,
    control,
    onSubmit,
    handleSubmit,
    t,
    isApplyButtonDisabled,
    setIsEnabled,
    setIsDisabled,
    isEnabled,
    isDisabled,
    getValues,
    selectSearchKey,
    sourceSystemsMenu,
    eventGroupListData,
  } = useEventFilterMenuForm({
    closeDrawer,
    setSearchQuery,
    activeSearchCriteria,
    setActiveSearchCriteria,
  });
  const isRtl = i18n.language === "ar";
  return (
    <div className="">
      <div className={`absolute ${isRtl ? "left-8" : "right-8"} top-[37.5px] `}>
        <Button
          label={t("eventsManagement.filterMenu.clear_all")}
          onClick={handleClear}
          size="large"
          className="text-primary-blue font-readexProMedium500 text-sm -mt-4"
          state="default"
          type="default"
          buttonVariant="link"
        />
      </div>
      <form className="relative  h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[calc(100vh-215px)] overflow-y-auto pe-6">
          <div className="">
            <EventCode control={control} formState={formState} t={t} />
          </div>
          <div className="mb-2 mr-4">
            <EventGroup
              control={control}
              getValues={getValues}
              //formState={formState}
              t={t}
              selectSearchKey={selectSearchKey}
              eventGroupListData={eventGroupListData}
            />
          </div>
          <div className="mr-4">
            <SourceSystem
              control={control}
              getValues={getValues}
              t={t}
              selectSearchKey={selectSearchKey}
              sourceSystemsMenu={sourceSystemsMenu}
            />
          </div>
          <div className="pt-4 w-full">
            <EventEnglishDescription
              control={control}
              formState={formState}
              watch={watch}
              t={t}
            />
          </div>
          <div className="">
            <EventArabicDescription
              control={control}
              watch={watch}
              t={t}
              formState={formState}
            />
          </div>
          <div className="pt-2">
            <Status
              control={control}
              watch={watch}
              t={t}
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              setIsButtonText={setIsButtonText}
            />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-divider-color flex justify-between items-center">
          <div></div>
          <div className="flex gap-4">
            <Button
              state="default"
              type="default"
              size="small"
              buttonVariant="outlined"
              onClick={handleCancel}
              label={t("eventsManagement.filterMenu.cancel")}
            />
            <Button
              label={t("eventsManagement.filterMenu.apply")}
              size="small"
              state={isApplyButtonDisabled ? "disabled" : "default"}
              type="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
