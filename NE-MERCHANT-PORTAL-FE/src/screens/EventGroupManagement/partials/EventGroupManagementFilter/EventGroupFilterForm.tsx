import { Button } from "eds-react";
import { EventGroupId } from "./EventGroupFilterItems/EventGroupId";
import { EventGroupType } from "./EventGroupFilterItems/EventGroupType";
import { EventGroupDescriptionAr } from "./EventGroupFilterItems/EventGroupDescAr";
import { EventGroupDescriptionEn } from "./EventGroupFilterItems/EventGroupDescEn";
import { useEventGroupFilterMenuFormProps } from "./EventGroupFilter.types";
import { useEventGroupFilterForm } from "./useEventGroupFilterForm";
import { EventGroupFilterSourceSystems } from "./EventGroupFilterItems/EventGroupFilterSourceSystems";
import i18n from "@ejada/common/locals/i18n";

export const EventGroupFilterForm = ({
  closeDrawer,
  setSearchQuery,
  sourceSystemsMenu,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useEventGroupFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    watch,
    t,
    handleCancel,
    handleClear,
    onSubmit,
    isApplyButtonDisabled,
    validationRules,
    isMarketing,
    setIsMarketing,
    isEshaar,
    setIsEshaar,
    isTouchId,
    setIsTouchId,
  } = useEventGroupFilterForm({
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
          label={t("eventGroupManagement.filter_menu.clear_all")}
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
            <EventGroupId
              control={control}
              formState={formState}
              t={t}
              eventCodeRule={validationRules.eventGroupCode}
            />
          </div>
          <div className="pt-2">
            <EventGroupType
              control={control}
              watch={watch}
              t={t}
              isMarketing={isMarketing}
              setIsMarketing={setIsMarketing}
              isEshaar={isEshaar}
              setIsEshaar={setIsEshaar}
              isTouchId={isTouchId}
              setIsTouchId={setIsTouchId}
            />
          </div>
          <div className="pt-2">
            <EventGroupFilterSourceSystems
              control={control}
              t={t}
              formState={formState}
              sourceSystemsMenu={sourceSystemsMenu}
            />
          </div>
          <div className="pt-4 w-full">
            <div className="">
              <EventGroupDescriptionEn
                control={control}
                formState={formState}
                t={t}
                descEnglishRule={validationRules.english}
              />
            </div>
            <div className="">
              <EventGroupDescriptionAr
                control={control}
                formState={formState}
                t={t}
                descArabicRule={validationRules.arabic}
              />
            </div>
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
              label={t("eventGroupManagement.filter_menu.cancel")}
            />
            <Button
              label={t("eventGroupManagement.filter_menu.apply")}
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
